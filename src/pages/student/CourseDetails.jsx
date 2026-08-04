import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import { useUser } from "@clerk/clerk-react";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useUser();

  const {
    allCourses,
    calculateRating,
    currency,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  // Find the course from allCourses
  useEffect(() => {
    if (allCourses.length > 0) {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse);
    }
  }, [id, allCourses]);

  // Check enrollment once courseData and user are available
  useEffect(() => {
    if (courseData && user) {
      setIsAlreadyEnrolled(
        courseData.enrolledStudents.includes(user.id)
      );
    }
  }, [courseData, user]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Extract the YouTube video ID from a full URL (handles youtu.be and youtube.com formats)
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/
    );
    return match ? match[1] : null;
  };

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
                  src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            </div>

            <span className="text-gray-600">
              ({courseData.courseRatings?.length || 0}{" "}
              {courseData.courseRatings?.length === 1 ? "Rating" : "Ratings"})
            </span>

            <span className="text-blue-600 font-medium">
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length === 1 ? "Student" : "Students"}
            </span>
          </div>

          {/* Instructor */}
          <p className="mt-4 text-gray-700">
            Course by{" "}
            <span className="font-semibold text-blue-600 hover:underline cursor-pointer">
              Piyush Agarwal
            </span>
          </p>

          {/* Duration / Lecture summary */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <img src={assets.time_clock_icon} alt="" className="w-4 h-4" />
              <span>{calculateCourseDuration(courseData)}</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={assets.lesson_icon} alt="" className="w-4 h-4" />
              <span>{calculateNoofLectures(courseData)} Lectures</span>
            </div>
          </div>

          {/* Description */}
          <div
            className="mt-8 text-gray-700 leading-8 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>li]:mb-2"
            dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
          />

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5 space-y-2">
              {courseData.courseContent.map((chapter, index) => {
                const isOpen = !!openSections[index];

                return (
                  <div
                    key={index}
                    className="border border-gray-300 bg-white rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(index)}
                      className="w-full flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={assets.down_arrow_icon}
                          alt=""
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                        <p className="font-medium md:text-base text-sm text-left">
                          {chapter.chapterTitle}
                        </p>
                      </div>
                      <p className="text-sm md:text-base text-gray-500 whitespace-nowrap">
                        {chapter.chapterContent.length} Lectures ·{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </button>

                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="border-t border-gray-200 divide-y divide-gray-100">
                          {chapter.chapterContent.map((lecture, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 px-4 py-3"
                            >
                              <img
                                src={assets.play_icon}
                                alt=""
                                className="w-4 h-4 mt-1 shrink-0"
                              />
                              <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <p className="text-sm text-gray-800">
                                  {lecture.lectureTitle}
                                </p>
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  {lecture.isPreviewFree && (
                                    <span
                                      onClick={() =>
                                        setPlayerData({
                                          videoId: getYoutubeId(lecture.lectureUrl),
                                        })
                                      }
                                      className="text-blue-600 font-medium cursor-pointer hover:underline"
                                    >
                                      Preview
                                    </span>
                                  )}
                                  <p>
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ["h", "m"] }
                                    )}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================= Right Section ================= */}
        <div className="w-full lg:w-[380px] bg-white rounded-2xl shadow-xl overflow-hidden sticky top-24">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt={courseData.courseTitle}
              className="w-full aspect-video object-cover"
            />
          )}

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
            <button
              disabled={isAlreadyEnrolled}
              className={`w-full mt-6 font-semibold py-3 rounded-lg transition duration-300 ${
                isAlreadyEnrolled
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            {/* Includes */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                This course includes:
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <img src={assets.time_clock_icon} alt="" className="w-5" />
                  <span>Lifetime Access</span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={assets.lesson_icon} alt="" className="w-5" />
                  <span>
                    {courseData.courseContent.length} Chapters,{" "}
                    {calculateNoofLectures(courseData)} Lectures
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={assets.time_left_clock_icon} alt="" className="w-5" />
                  <span>{calculateCourseDuration(courseData)} of content</span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={assets.star} alt="" className="w-5" />
                  <span>Certificate of Completion</span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={assets.user_icon} alt="" className="w-5" />
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