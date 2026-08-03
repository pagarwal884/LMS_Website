import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course);

  const discountedPrice = (
    course.coursePrice -
    (course.discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="border border-gray-500/30 rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
    >
      {/* Course Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full aspect-video object-contain bg-gray-100"
      />

      {/* Course Details */}
      <div className="p-4">
        {/* Course Title */}
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="mt-1 text-sm text-gray-500">
          {course.educator.name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <p className="text-sm font-medium text-gray-700">
            {rating.toFixed(1)}
          </p>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(rating)
                    ? assets.star
                    : assets.star_blank
                }
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            ({course.courseRatings?.length || 0})
          </p>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <p className="text-lg font-bold text-gray-800">
            {currency}
            {discountedPrice}
          </p>

          {course.discount > 0 && (
            <p className="text-sm text-gray-400 line-through">
              {currency}
              {course.coursePrice.length}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;