import { FileText } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-4 py-5 sm:px-6 flex items-center">
          <FileText className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
        </div>
        <div className="px-4 py-5 sm:p-6 text-black">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing or using our service, you agree to be bound by these Terms of Service.</p>

          <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">We provide a plant identification service using artificial intelligence technology.</p>

          <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="mb-4">You are responsible for your use of the service and any content you provide, including compliance with applicable laws.</p>

          <h2 className="text-xl font-semibold mb-4">4. Intellectual Property Rights</h2>
          <p className="mb-4">The service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>

          <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
          <p className="mb-4">We may terminate or suspend your access to our service immediately, without prior notice or liability, for any reason whatsoever.</p>

          <p className="text-sm text-gray-600 mt-8">Last updated: August 16, 2024</p>
        </div>
      </div>
    </div>
  )
}   