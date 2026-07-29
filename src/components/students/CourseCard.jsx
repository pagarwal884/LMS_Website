import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const CourseCard = ({course}) => {

  const {currency} = useContext(AppContext)

  return (
    <div>
      <h1>
        <img src={course.courseThumbnail} alt="" />
        <div>
          <h3>
            {course.courseTitle}
          </h3>
          <p>
            {course.educator.name}
          </p>
          <div>
            <p>
              4.5
            </p>
            <div>
              {[...Array(5)].map((_, i) => (
                <img key={i} src={assets.star} alt="" />
              ))}
            </div>
            <p>
              22
            </p>
          </div>
          <p>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
        </div>
      </h1>
    </div>
  )
}

export default CourseCard
