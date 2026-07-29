import React from 'react'
import { Link } from 'react-router-dom'

const CoursesSection = () => {
  return (
    <div className='py-16 md:px-40 px-8 text-center'>
      <h2 className='text-3xl font-medium text-gray-800'>
        Learn From the Best
      </h2>

      <p className='mt-4 text-gray-600 max-w-2xl mx-auto'>
        Explore our carefully curated collection of top-rated courses designed
        to help you learn, grow, and achieve your goals.
      </p>

      

      <Link
        to={'/course-list'}
        onClick={() => scrollTo(0, 0)}
        className='inline-block mt-8 text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
      >
        Show all courses
      </Link>
    </div>
  )
}

export default CoursesSection