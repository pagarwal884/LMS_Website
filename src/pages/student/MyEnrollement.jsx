import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Line } from "rc-progress";

const MyEnrollement = () => {
  const { enrolledCourses, calculateCourseDuration } =
    useContext(AppContext);

  const navigate = useNavigate();

  const progressArray = [
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 8 },
    { lectureCompleted: 7, totalLectures: 12 },
    { lectureCompleted: 4, totalLectures: 6 },
    { lectureCompleted: 8, totalLectures: 15 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 6, totalLectures: 14 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-3 sm:px-5 md:px-8 lg:px-16 xl:px-36 py-8">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        My Enrollments
      </h1>

      {/* Table Wrapper */}
      <div className="mt-8 w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
        <table className="w-full min-w-[650px] table-fixed">
          {/* Table Head */}
          <thead className="border-b border-gray-200 bg-gray-100">
            <tr className="text-left text-xs sm:text-sm uppercase tracking-wide text-gray-700">
              <th className="w-[40%] px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold">
                Course
              </th>

              <th className="w-[20%] px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold">
                Duration
              </th>

              <th className="w-[20%] px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold">
                Completed
              </th>

              <th className="w-[20%] px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-semibold">
                Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {enrolledCourses.map((course, index) => {
              const progress = progressArray[index] || {
                lectureCompleted: 0,
                totalLectures: 0,
              };

              const progressPercentage =
                progress.totalLectures > 0
                  ? Math.round(
                      (progress.lectureCompleted /
                        progress.totalLectures) *
                        100
                    )
                  : 0;

              const isCompleted =
                progress.lectureCompleted ===
                  progress.totalLectures &&
                progress.totalLectures > 0;

              return (
                <tr
                  key={course._id || index}
                  className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
                >
                  {/* Course */}
                  <td className="px-3 sm:px-4 md:px-6 py-4 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                      {/* Thumbnail */}
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="h-12 w-20 sm:h-14 sm:w-24 md:h-16 md:w-28 shrink-0 rounded-md sm:rounded-lg object-cover shadow-sm"
                      />

                      {/* Course Details */}
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-xs sm:text-sm md:text-base font-semibold text-gray-800">
                          {course.courseTitle}
                        </h2>

                        {/* Progress Bar */}
                        <div className="mt-1.5 sm:mt-2 w-full max-w-[180px] sm:max-w-[220px] md:max-w-[250px]">
                          <Line
                            percent={progressPercentage}
                            strokeWidth={4}
                            strokeColor="#2563eb"
                            trailWidth={4}
                            trailColor="#e5e7eb"
                          />
                        </div>

                        <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
                          {progressPercentage}% completed
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 text-xs sm:text-sm text-gray-600">
                    {calculateCourseDuration(course)}
                  </td>

                  {/* Completed */}
                  <td className="px-3 sm:px-4 md:px-6 py-4 sm:py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        {progress.lectureCompleted} /{" "}
                        {progress.totalLectures}
                      </span>

                      <span className="text-[10px] sm:text-xs text-gray-500">
                        Lectures
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-3 sm:px-4 md:px-6 py-4 sm:py-5">
                    <button
                      onClick={() =>
                        navigate(`/player/${course._id}`)
                      }
                      className={`whitespace-nowrap rounded-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm font-medium transition ${
                        isCompleted
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      }`}
                    >
                      {isCompleted ? "Completed" : "Ongoing"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {enrolledCourses.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-sm text-gray-500"
                >
                  No enrolled courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollement;