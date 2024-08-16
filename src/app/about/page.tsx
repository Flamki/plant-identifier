import { Info } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-4 py-5 sm:px-6 flex items-center">
          <Info className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">About Us</h1>
        </div>
        <div className="px-4 py-5 sm:p-6 text-black">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">At Plant Identifier, our mission is to connect people with nature by leveraging cutting-edge AI technology. We believe that understanding the plants around us is the first step towards appreciating and preserving our natural world.</p>

          <h2 className="text-xl font-semibold mb-4">Our Story</h2>
          <p className="mb-6">Founded in 2024 by a team of botanists and AI enthusiasts, Plant Identifier was born out of a passion for plants and a desire to make botanical knowledge accessible to everyone. What started as a small project has grown into a global community of plant lovers and citizen scientists.</p>

          <h2 className="text-xl font-semibold mb-4">Our Technology</h2>
          <p className="mb-6">We use state-of-the-art machine learning algorithms trained on millions of plant images to provide accurate and instant plant identification. Our AI is constantly learning and improving, thanks to the contributions of our user community.</p>

          <h2 className="text-xl font-semibold mb-4">Our Team</h2>
          <p className="mb-6">Our diverse team includes botanists, software engineers, UX designers, and AI researchers. We're united by our love for plants and our commitment to creating a user-friendly, educational platform for plant enthusiasts of all levels.</p>

          <h2 className="text-xl font-semibold mb-4">Join Us</h2>
          <p>Whether you're a seasoned botanist or just starting to explore the world of plants, we invite you to join our community. Together, we can foster a greater understanding and appreciation of the plant kingdom.</p>
        </div>
      </div>
    </div>
  )
}