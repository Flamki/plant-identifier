import { HelpCircle } from 'lucide-react'

export default function FAQ() {
  const faqs = [
    {
      question: "How accurate is the plant identification?",
      answer: "Our AI-powered plant identification is highly accurate, with a success rate of over 90%. However, results may vary depending on the quality of the image and the rarity of the plant species."
    },
    {
      question: "Can I use the app offline?",
      answer: "Currently, our app requires an internet connection to perform plant identification, as it needs to communicate with our AI servers."
    },
    {
      question: "Is the app free to use?",
      answer: "We offer a free tier with limited identifications per day. For unlimited use, we have premium subscription plans available."
    },
    {
      question: "How do I take the best photo for identification?",
      answer: "For best results, take a clear, well-lit photo of the plant's leaves, flowers, or fruits. Try to avoid shadows and make sure the plant fills most of the frame."
    },
    {
      question: "Can I identify plants from old or existing photos?",
      answer: "Yes, you can upload existing photos from your device. However, for the most accurate results, we recommend taking a new photo with our in-app camera."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-purple-600 px-4 py-5 sm:px-6 flex items-center">
          <HelpCircle className="h-8 w-8 text-white mr-3" />
          <h1 className="text-2xl font-bold text-white">Frequently Asked Questions</h1>
        </div>
        <div className="px-4 py-5 sm:p-6">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}