import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([])

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Fetch user Enrolled Courses
  const fetchUserEnrolledCourses = async() => {
    setEnrolledCourses(dummyCourses)
  }

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses()
  }, []);

  // ==========================
  // Calculate Average Rating
  // ==========================
  const calculateRating = (course) => {
    if (!course?.courseRatings?.length) {
      return 0;
    }

    const total = course.courseRatings.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    return total / course.courseRatings.length;
  };

  // ==========================
  // Calculate Chapter Duration
  // ==========================
  const calculateChapterTime = (chapter) => {
    let time = 0;

    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // ==========================
  // Calculate Total Course Duration
  // ==========================
  const calculateCourseDuration = (course) => {
    let time = 0;

    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });

    return humanizeDuration(time * 60 * 1000, {
      units: ["h", "m"],
      round: true,
    });
  };

  // Function to Calculate Total Number of Lectures
  const calculateNoofLectures = (course) => {
    let totalLectures = 0;

    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });

    return totalLectures;
  };

  const value = {
    currency,
    allCourses,
    setAllCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    isEducator,
    setIsEducator,
    enrolledCourses,
    fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};