'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Camera, Upload, X, Cpu, Leaf } from 'lucide-react'

interface PlantInfo {
  name?: string;
  scientificName?: string;
  family?: string;
  origin?: string;
  uses?: string;
  description?: string;
}

export default function PlantIdentifier() {
  const [image, setImage] = useState<string | null>(null)
  const [plantInfo, setPlantInfo] = useState<PlantInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImage(event.target.result);
          identifyPlant(event.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const startCamera = async () => {
    setShowCamera(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        setError("Failed to access the camera. Please make sure you've granted the necessary permissions.");
      }
    }
  }

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg');
        setImage(imageDataUrl);
        setShowCamera(false);
        stopCameraStream();
        identifyPlant(imageDataUrl);
      }
    }
  }

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  const identifyPlant = async (imageData: string) => {
    setLoading(true);
    setPlantInfo(null);
    setError(null);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error || 'Unknown error'}, details: ${data.details || 'No details provided'}`);
      }

      if (data.error) {
        throw new Error(`${data.error}: ${data.details || 'No details provided'}`);
      }

      setPlantInfo(data.result);
    } catch (error) {
      console.error('Error identifying plant:', error);
      setError(`Error identifying plant: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-green-800">Plant Identifier</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Discover the fascinating world of plants around you!
        </p>
      </header>

      <section className="bg-white p-4 md:p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Capture or Upload a Plant Image</h2>
        <p className="mb-4 text-gray-600">
          Take a photo or upload an image of a plant to identify it and learn about its characteristics!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={startCamera}
            className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <Camera className="mr-2" size={24} />
            Take Photo
          </button>
          <label htmlFor="image-upload" className="flex-1 bg-green-500 text-white py-3 px-4 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center cursor-pointer">
            <Upload className="mr-2" size={24} />
            Upload Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
        
        {showCamera && (
          <div className="relative mb-6">
            <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
            <button
              onClick={captureImage}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-green-600 py-2 px-4 rounded-full shadow-lg hover:bg-green-100 transition duration-300"
            >
              Capture
            </button>
            <button
              onClick={() => {setShowCamera(false); stopCameraStream();}}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {image && !showCamera && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-green-600">Image Preview</h3>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt="Captured plant"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </section>

      {loading && (
        <div className="text-center mb-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-2 text-gray-600">Identifying plant...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 md:p-6 bg-red-100 text-red-700 rounded-lg mb-8">
          <h3 className="text-lg md:text-xl font-bold mb-2">Error Occurred</h3>
          <p>{error}</p>
        </div>
      )}

      {plantInfo && (
        <section className="mt-8 bg-white p-4 md:p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-800">Identification Results</h2>
          {plantInfo.name && (
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-600">{plantInfo.name}</h3>
          )}
          
          {plantInfo.description && (
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700">{plantInfo.description}</p>
            </div>
          )}

          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-green-700">Plant Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {Object.entries(plantInfo).map(([key, value]) => (
                  key !== 'name' && key !== 'description' && (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="py-3 px-4 font-semibold text-gray-600 bg-gray-50">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td className="py-3 px-4 text-gray-800">{value}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-12 relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {[
            { icon: Camera, title: "1. Capture or Upload", description: "Take a photo or upload an image of the plant you want to identify" },
            { icon: Cpu, title: "2. AI Analysis", description: "Our advanced AI processes the image to identify the plant species with high accuracy" },
            { icon: Leaf, title: "3. Get Results", description: "Receive detailed information about the plant, including its name, origin, uses, and more" }
          ].map((step, index) => (
            <div 
              key={index}
              className={`bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 ease-in-out ${activeStep === index ? 'scale-105 ring-2 ring-green-400' : 'scale-100'}`}
            >
              <step.icon className={`mb-4 transition-all duration-300 ${activeStep === index ? 'text-green-400 scale-110' : 'text-gray-400'}`} size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-200 to-transparent opacity-20 blur-3xl -z-10"></div>
        <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-200 to-transparent opacity-30 blur-xl transition-opacity duration-500 ease-in-out ${activeStep === 0 ? 'opacity-50' : activeStep === 1 ? 'opacity-30' : 'opacity-10'}`}></div>
      </section>

      <footer className="mt-16 text-center text-gray-500">
        <p>© 2024 Plant Identifier. All rights reserved.</p>
        <p>Powered by AI and the love for nature.</p>
      </footer>
    </div>
  )
}