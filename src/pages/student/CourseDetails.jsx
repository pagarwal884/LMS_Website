import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";


const CourseDetails = () => {
  const { id } = useParams();


  const { allCourses, calculateRating } = useContext(AppContext);


  const [courseData, setCourseData] = useState(null);

  const rating = calculateRating(courseData);

  const fetchCourseData = () => {
    const findCourse = allCourses.find((course) => course._id === id);

    if (findCourse) {
      setCourseData(findCourse);
    }
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      fetchCourseData();
    }
  }, [id, allCourses]);

  if (!courseData) {
    return (
      <Loading />
    );
  }

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-cyan-100/70 to-white">
      <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-6 md:pt-30 pt-20 pb-20">

        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {courseData.courseTitle}
          </h1>

          <div
            className="mt-6 text-gray-700 leading-8 space-y-4"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0,200)
            }}
          />

          {/* Reviews & Ratings */}
          <div className="mt-6 flex items-center gap-3 pt-3 pb-1 text-sm">
            <span className="text-lg font-semibold text-amber-600">
              {rating.toFixed(1)}
            </span>

            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            <span className="text-gray-600 text-sm">
              ({courseData.courseRatings?.length >1 ? 'Ratings' : 'Rating'})
            </span>

            <p className="text-blue-600">
              ({courseData.enrolledStudents.length} {courseData.enrolledStudents.length > 1 ? 'students' : 'student'})
            </p>
          </div>

          <p className="text-sm">
            Course by:<span className="text-blue-600 underline">Piyush Agarwal</span> 
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[380px] bg-white rounded-xl shadow-lg overflow-hidden">
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-xl font-semibold">
              ${courseData.coursePrice}
            </h2>

            <button className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
              Enroll Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetails;