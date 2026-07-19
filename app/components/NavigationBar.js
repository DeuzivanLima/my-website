"use client"
import React, { useState } from 'react'
import Link from "next/link"
import { CircleAlert, Home, Menu, X } from 'lucide-react'

const options = [
  {
    name: "Home",
    href: "/",
    icon: <Home size={21}/>
  },
  {
    name: "About",
    href: "#",
    icon: <CircleAlert size={21}/>
  }
]

export const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="p-6 bg-neutral-900 flex justify-between items-center relative">
      <div className="text-white font-bold">PORTFOLIO</div>
      
      <ul className="hidden md:flex gap-4">
        {options.map((option, index) => (
          <li key={index}>
            <Link
              href={option.href}
              className="text-neutral-400 hover:text-gray-300 transition-colors"
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white"
        >
          <Menu size={24} className={isMobileMenuOpen ? "opacity-0" : ""}/>
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`} 
        onClick={toggleMobileMenu}
      >
        <div
          className={`
            fixed top-0 right-0 w-64 h-full bg-neutral-900 shadow-lg 
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen 
              ? 'translate-x-0' 
              : 'translate-x-full'
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 left-4 text-white"
          >
            <X size={24} />
          </button>
          
          <ul className="flex flex-col mt-16 space-y-1">
            {options.map((option, index) => (
              <li 
                key={index} 
              >
                <Link
                  href={option.href}
                  className="text-white transition-colors flex items-center p-4 gap-4 hover:bg-neutral-600 bg-neutral-800"
                  onClick={toggleMobileMenu}
                  >
                  {option.icon}
                  <span>
                    {option.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}