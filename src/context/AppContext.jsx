import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating
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

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    setAllCourses,
    calculateRating,
    isEducator,
    setIsEducator,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};