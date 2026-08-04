import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();

  const { allCourses, calculateRating, currency } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    if (allCourses.length > 0) {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse);
    }
  }, [id, allCourses]);

  if (!courseData) {
    return <Loading />;
  }

  const rating = calculateRating(courseData);

  const discountedPrice = (
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100
  ).toFixed(2);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-cyan-100/70 to-white">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row gap-12 items-start justify-between px-6 md:px-12 lg:px-20 xl:px-32 pt-24 pb-20">
        {/* ================= Left Section ================= */}
        <div className="flex-1">
          {/* Course Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {courseData.courseTitle}
          </h1>

          {/* Ratings */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-lg font-semibold text-amber-600">
              {rating.toFixed(1)}
            </span>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(rating)
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            <span className="text-gray-600">
              ({courseData.courseRatings?.length || 0}{" "}
              {courseData.courseRatings?.length === 1
                ? "Rating"
                : "Ratings"})
            </span>

            <span className="text-blue-600 font-medium">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length === 1
                ? "Student"
                : "Students"}
            </span>
          </div>

          {/* Instructor */}
          <p className="mt-4 text-gray-700">
            Course by{" "}
            <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
              Piyush Agarwal
            </span>
          </p>

          {/* Description */}
          <div
            className="mt-8 text-gray-700 leading-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription,
            }}
          />
        </div>

        {/* ================= Right Section ================= */}
        <div className="w-full lg:w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
          {/* Thumbnail */}
          <img
            src={courseData.courseThumbnail}
            alt={courseData.courseTitle}
            className="w-full aspect-video object-cover"
          />

          {/* Card Content */}
          <div className="p-6">
            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {currency}
                {discountedPrice}
              </span>

              {courseData.discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {currency}
                    {courseData.coursePrice}
                  </span>

                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {courseData.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Enroll Button */}
            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300">
              Enroll Now
            </button>

            {/* Includes */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                This course includes:
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <img
                    src={assets.time_clock_icon}
                    alt=""
                    className="w-5"
                  />
                  <span>Lifetime Access</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={assets.lesson_icon}
                    alt=""
                    className="w-5"
                  />
                  <span>
                    {courseData.courseContent.length} Chapters
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={assets.star}
                    alt=""
                    className="w-5"
                  />
                  <span>Certificate of Completion</span>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={assets.person_icon}
                    alt=""
                    className="w-5"
                  />
                  <span>Access on Mobile & Desktop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;