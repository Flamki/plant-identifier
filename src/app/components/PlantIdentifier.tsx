'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function PlantIdentifier() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
      setError(null)
    }
  }

  const identifyPlant = async () => {
    if (!image) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error || 'Unknown error'}, details: ${data.details || 'No details provided'}`)
      }

      if (data.error) {
        throw new Error(`${data.error}: ${data.details || 'No details provided'}`)
      }

      setResult(data.result)
    } catch (error) {
      console.error('Error identifying plant:', error)
      setError(`Error identifying plant: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Upload a plant image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      {image && (
        <div className="mb-4">
          <Image
            src={URL.createObjectURL(image)}
            alt="Uploaded plant"
            width={300}
            height={300}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}
      <button
        onClick={identifyPlant}
        disabled={!image || loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
      >
        {loading ? 'Identifying...' : 'Identify Plant'}
      </button>
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  )
}