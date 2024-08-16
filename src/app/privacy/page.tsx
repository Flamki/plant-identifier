import { Shield } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-green-600 px-4 py-5 sm:px-6 flex items-center">
          <Shield className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
        </div>
        <div className="px-4 py-5 sm:p-6 text-black">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>

          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to provide, maintain, and improve our services, as well as to develop new features and protect our users.</p>

          <h2 className="text-xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
          <p className="mb-4">We do not share your personal information with third parties except as described in this policy or with your consent.</p>

          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect the security of your personal information.</p>

          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights.</p>

          <p className="text-sm text-gray-600 mt-8">Last updated: August 16, 2024</p>
        </div>
      </div>
    </div>
  )
}