import React from 'react'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full pt-20 md:pt-36 px-6 md:px-0 text-center space-y-8 bg-linear-to-b from-cyan-100/70 to-white">

      <h1 className="relative max-w-4xl mx-auto text-home-heading-small md:text-home-heading-large font-bold leading-tight text-gray-800">
        Empower your future with courses designed to{" "}
        <span className="text-blue-600">fit your choice.</span>

        <img
          src={assets.sketch}
          alt="underline"
          className="hidden md:block absolute -bottom-7 right-2"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        Learn from industry experts through hands-on, practical courses that
        help you build real-world skills. Whether you're starting your journey
        or advancing your career, discover flexible learning designed to match
        your goals and learn at your own pace.
      </p>

      <p className="md:block text-gray-500 max-w-2xl mx-auto">
        We Bring togrther world-class instrucstirs to help you achieve your professional goals.
      </p>

    </section>
  )
}

export default Hero