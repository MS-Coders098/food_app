import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <p>&copy; 2024 Foodie. All rights reserved.</p>
        <nav className="space-x-4">
          <a href="#" className="hover:text-green-600">Privacy Policy</a>
          <a href="#" className="hover:text-green-600">Terms of Service</a>
        </nav>
      </div>
    </div>
  </footer>
  )
}

export default Footer