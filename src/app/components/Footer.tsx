import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-green-200">
              Plant Identifier uses advanced AI technology to help you identify and learn about various plant species. Our mission is to connect people with nature and promote botanical knowledge.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-green-200 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-green-200 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/faq" className="text-green-200 hover:text-white">FAQ</Link></li>
              <li><Link href="/contact" className="text-green-200 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="text-green-200 mb-2">Email: info@plantidentifier.com</p>
            <p className="text-green-200 mb-2">Phone: (123) 456-7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-green-200">Facebook</a>
              <a href="#" className="text-white hover:text-green-200">Twitter</a>
              <a href="#" className="text-white hover:text-green-200">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-green-700 text-center">
          <p>© 2024 Plant Identifier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer