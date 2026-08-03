import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-[#0F1722] text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">

        {/* Left */}
        <div>
          <img
            src={assets.logo_dark}
            alt="Edemy"
            className="h-9"
          />

          <p className="mt-5 text-sm leading-7 text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text.
          </p>
        </div>

        {/* Company */}
        <div className="md:justify-self-center">
          <h3 className="text-white font-semibold text-lg">
            Company
          </h3>

          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition">
                About us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition">
                Contact us
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white transition">
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold text-lg">
            Subscribe to our newsletter
          </h3>

          <p className="mt-5 text-sm leading-7 text-gray-400">
            The latest news, articles, and resources,
            sent to your inbox weekly.
          </p>

          <div className="flex mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-[#182231] text-sm text-white placeholder-gray-500 px-4 py-3 rounded-l-md outline-none"
            />

            <button className="bg-blue-600 hover:bg-blue-700 px-5 rounded-r-md text-sm font-medium text-white transition">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-6xl mx-auto py-5 text-center text-sm text-gray-500">
          Copyright {new Date().getFullYear()} © Edemy. All Right Reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer