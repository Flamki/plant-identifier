'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PlantInfo {
  name: string;
  scientificName: string;
  family: string;
  origin: string;
  uses: string;
  description: string;
}

export default function PlantIdentifier() {
  const [image, setImage] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
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
    setPlantInfo(null)
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

      if (typeof data.result === 'string') {
        setResult(data.result)
      } else if (typeof data.result === 'object') {
        setResult(data.result.description || 'No description available')
        setPlantInfo(data.result)
      }
    } catch (error) {
      console.error('Error identifying plant:', error)
      setError(`Error identifying plant: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-green-800">Plant Identifier</h1>
        <p className="text-xl text-gray-600">
          Discover the fascinating world of plants around you!
        </p>
      </header>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Upload Your Plant Image</h2>
        <p className="mb-4 text-gray-600">
          Take a clear photo of a plant and let our AI identify it for you. Learn about its characteristics, origins, and uses!
        </p>
        <div className="mb-6">
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Select a plant image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100 cursor-pointer
              border border-gray-300 rounded-md"
          />
        </div>
        
        {image && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Preview</h3>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded plant"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        )}

        <button
          onClick={identifyPlant}
          disabled={!image || loading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 transition duration-300 disabled:bg-gray-400 text-lg font-semibold"
        >
          {loading ? 'Identifying...' : 'Identify Plant'}
        </button>
      </section>

      {error && (
        <div className="mt-8 p-6 bg-red-100 text-red-700 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Error Occurred</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <section className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-green-800">Identification Results</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-8">{result}</p>
          </div>

          {plantInfo && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-700">Plant Details</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(plantInfo).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-200">
                        <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td className="py-3 px-4 text-gray-800">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="mt-16 text-center text-gray-500">
        <p>© 2024 Plant Identifier. All rights reserved.</p>
        <p>Powered by AI and the love for nature.</p>
      </footer>
    </div>
  )
}