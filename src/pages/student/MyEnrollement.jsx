import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import humanizeDuration from "humanize-duration";

const MyEnrollement = () => {
  const { enrolledCourses, calculateCourseDuration } =
    useContext(AppContext);

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
              <th className="px-6 py-4 font-semibold">Course</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Completed</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {enrolledCourses.map((course, index) => (
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
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      4 / 10
                    </span>
                    <span className="text-sm text-gray-500">
                      Lectures
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <button className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition">
                    Ongoing
                  </button>
                </td>
              </tr>
            ))}

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