import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
      {/* Heading */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
          Learn From the Best
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-600 leading-7">
          Explore our carefully curated collection of top-rated courses designed
          to help you learn, grow, and achieve your goals.
        </p>
      </div>

      {/* Courses */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard
            key={course._id || course.id}
            course={course}
          />
        ))}
      </div>

      {/* Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/course-list"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300"
        >
          Show All Courses
        </Link>
      </div>
    </section>
  );
};

export default CoursesSection;