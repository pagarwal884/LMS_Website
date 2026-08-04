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
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseTitle}
          className="w-full aspect-video object-contain bg-gray-100 group-hover:scale-105 transition-transform duration-500"
        />

        {course.discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.discount}% OFF
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col items-start text-left">
        {/* Title */}
        <h3 className="w-full text-lg font-semibold text-gray-900 line-clamp-2 leading-7">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="mt-2 text-sm text-gray-500">
          By <span className="font-medium text-gray-700">Piyush Agarwal</span>
        </p>

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-semibold text-yellow-600">
            {rating.toFixed(1)}
          </span>

          <div className="flex items-center gap-0.5">
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

          <span className="text-sm text-gray-500">
            ({course.courseRatings?.length || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {currency}
            {discountedPrice}
          </span>

          {course.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              {currency}
              {course.coursePrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;