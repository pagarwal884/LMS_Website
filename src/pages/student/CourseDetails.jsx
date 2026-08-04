import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";

const CourseDetails = () => {
  const { id } = useParams();

  const { allCourses } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);

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
              __html: courseData.courseDescription,
            }}
          />

          {/* review and ratings */}
          
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