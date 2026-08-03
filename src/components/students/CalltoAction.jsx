import React from 'react'
import { assets } from '../../assets/assets'

const CalltoAction = () => {
  return (
    <section className="py-16 px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Learn Anything, Anytime, Anywhere
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
          Start your learning journey today with flexible online courses that
          fit your schedule and empower you to succeed from anywhere in the
          world.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Get Started
          </button>

          <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">
            Learn More
            <img
              src={assets.arrow_icon}
              alt="arrow"
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </section>
  )
}

export default CalltoAction