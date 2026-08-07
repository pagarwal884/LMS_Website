import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const MyEnrollement = () => {
  const { enrolledCourses, calculateCourseDuration } =
    useContext(AppContext);

  const [progressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 5, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 8 },
    { lectureCompleted: 7, totalLectures: 12 },
    { lectureCompleted: 4, totalLectures: 6 },
    { lectureCompleted: 8, totalLectures: 15 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 10, totalLectures: 10 },
    { lectureCompleted: 6, totalLectures: 14 },
  ]);

  return (
    <div className="md:px-36 px-6 py-10 min-h-screen bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        My Enrollments
      </h1>

      {/* Table */}
      <div className="mt-8 overflow-x-auto rounded-xl bg-white shadow-lg border border-gray-200">
        <table className="w-full min-w-[700px]">
          {/* Table Head */}
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr className="text-left text-gray-700 text-sm uppercase tracking-wide">
              <th className="px-6 py-4 font-semibold">
                Course
              </th>

              <th className="px-6 py-4 font-semibold">
                Duration
              </th>

              <th className="px-6 py-4 font-semibold">
                Completed
              </th>

              <th className="px-6 py-4 font-semibold">
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

              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 last:border-none hover:bg-gray-50 transition"
                >
                  {/* Course */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-28 h-16 object-cover rounded-lg shadow-sm"
                      />

                      <div>
                        <h2 className="font-semibold text-gray-800">
                          {course.courseTitle}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Enrolled Course
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-5 text-gray-600 font-medium">
                    {calculateCourseDuration(course)}
                  </td>

                  {/* Completed */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-gray-800">
                        {progress.lectureCompleted} /{" "}
                        {progress.totalLectures}
                      </span>

                      <span className="text-sm text-gray-500">
                        Lectures
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    {progress.lectureCompleted ===
                    progress.totalLectures ? (
                      <button className="bg-green-100 text-green-700 font-medium px-4 py-2 rounded-full text-sm">
                        Completed
                      </button>
                    ) : (
                      <button className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm">
                        Ongoing
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* Empty State */}
            {enrolledCourses.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-gray-500"
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