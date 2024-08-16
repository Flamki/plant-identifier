'use client'

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Plant Identifier</Link>
        
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link href="/" className="hover:text-green-200">Home</Link></li>
          <li><Link href="/about" className="hover:text-green-200">About</Link></li>
          <li><Link href="/contact" className="hover:text-green-200">Contact</Link></li>
          <li><Link href="/faq" className="hover:text-green-200">FAQ</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="pt-4">
            <li><Link href="/" className="block py-2 px-4 hover:bg-green-600">Home</Link></li>
            <li><Link href="/about" className="block py-2 px-4 hover:bg-green-600">About</Link></li>
            <li><Link href="/contact" className="block py-2 px-4 hover:bg-green-600">Contact</Link></li>
            <li><Link href="/faq" className="block py-2 px-4 hover:bg-green-600">FAQ</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar