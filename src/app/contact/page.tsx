'use client'

import { useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'fintechgrow@fintechgrow.com'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-yellow-600 px-4 py-5 sm:px-6 flex items-center">
          <Mail className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">Contact Us</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-lg text-gray-700 mb-6">
            Have a question or feedback? We&apos;d love to hear from you! 
            Please feel free to reach out to us at:
          </p>
          <div 
            className="bg-yellow-100 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-yellow-200 transition duration-300"
            onClick={copyToClipboard}
          >
            <span className="text-xl font-semibold text-yellow-800">{email}</span>
            {copied ? (
              <Check className="h-6 w-6 text-green-600" />
            ) : (
              <Copy className="h-6 w-6 text-yellow-600" />
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {copied ? 'Copied to clipboard!' : 'Click to copy email address'}
          </p>
          <p className="mt-6 text-gray-700">
            We strive to respond to all inquiries within 24-48 hours. 
            Thank you for your interest in Plant Identifier!
          </p>
        </div>
      </div>
    </div>
  )
}