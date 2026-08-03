import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../../components/students/SearchBar'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/students/CourseCard'
import { assets } from '../../assets/assets'

const CoursesList = () => {

  const navigate = useNavigate()
  const { allCourses } = useContext(AppContext)
  const { input } = useParams()

  const [filterCourse, setFilterCourse] = useState([])


  useEffect(() => {

    if (allCourses && allCourses.length > 0) {

      if (input) {

        const tempCourses = allCourses.filter((course) =>
          course.courseTitle
            .toLowerCase()
            .includes(input.toLowerCase())
        )

        setFilterCourse(tempCourses)

      } else {

        setFilterCourse(allCourses)

      }

    }

  }, [allCourses, input])


  return (

    <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 pt-20 pb-16">


      {/* Header Section */}
      <div className="
        flex
        flex-col
        md:flex-row
        gap-6
        md:gap-10
        items-start
        md:items-center
        justify-between
      ">


        {/* Title */}
        <div>

          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
            Course List
          </h1>


          <p className="text-gray-500 mt-3 text-sm sm:text-base">

            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/')}
            >
              Home
            </span>

            <span className="mx-2">
              /
            </span>

            <span>
              Course List
            </span>

          </p>

        </div>


        {/* Search */}
        <div className="w-full md:w-auto">
          <SearchBar data={input} />
        </div>


      </div>


      {/* Active Search Filter */}
      {
        input && (

          <div className="
            mt-8
            inline-flex
            items-center
            gap-3
            px-4
            py-2
            bg-gray-100
            border
            border-gray-300
            rounded-lg
            text-gray-700
          ">

            <p className="text-sm font-medium">
              {input}
            </p>


            <img
              src={assets.cross_icon}
              alt="clear search"
              className="
                w-4
                h-4
                cursor-pointer
                hover:scale-110
                transition
              "
              onClick={() => navigate('/course-list')}
            />

          </div>

        )
      }



      {/* Course Grid */}
      <div
        className="
          mt-12
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-x-6
          gap-y-10
        "
      >

        {
          filterCourse.map((course) => (

            <CourseCard
              key={course._id}
              course={course}
            />

          ))
        }

      </div>



      {/* No Course Found */}
      {
        filterCourse.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-xl font-semibold text-gray-700">
              No courses found
            </h2>

            <p className="text-gray-500 mt-2">
              Try searching with a different keyword.
            </p>

          </div>

        )
      }


    </div>

  )
}

export default CoursesList