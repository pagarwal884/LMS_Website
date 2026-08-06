import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const MyEnrollement = () => {
  return (
    <div className="md:px-36 px-8 pt-10 min-h-screen">
      <h1 className="text-2xl font-semibold">My Enrollments</h1>

      <div className="overflow-x-auto mt-10">
        <table className="w-full border border-gray-300">
          <thead className="text-gray-900 border-b border-gray-300 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold">Course</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Completed</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default MyEnrollement;