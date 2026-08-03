import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  return (
    <section className="py-16 px-8 md:px-0">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
          What Our Students Say
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
          Discover how students from around the world have transformed their
          skills, achieved their goals, and accelerated their careers through
          our expertly crafted courses.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {dummyTestimonial.map((data, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-100 bg-gray-300/30">
              <img
                src={data.image}
                alt={data.name}
                className="w-14 h-14 rounded-full object-cover border border-gray-200"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {data.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {data.role}
                </p>
              </div>
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(data.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}

                <span className="ml-2 text-sm text-gray-500">
                  ({data.rating})
                </span>
              </div>

              {/* Feedback */}
              <p className="mt-5 text-gray-600 leading-7 flex-1">
                {data.feedback}
              </p>

              {/* Read More */}
              <a className="mt-6 self-start text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TestimonialSection