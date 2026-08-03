import { assets } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const { isEducator } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const location = useLocation();

  const isCourseListPage = location.pathname.includes("/course-list");

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {user && (
          <>
            <button
              onClick={() => navigate("/educator")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              {isEducator ? "Educator Dashboard" : "Become Educator"}
            </button>

            <span>|</span>

            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition"
            >
              My Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex items-center gap-3 text-gray-500">
        {user && (
          <>
            <button
              onClick={() => navigate("/educator")}
              className="text-xs cursor-pointer"
            >
              {isEducator ? "Dashboard" : "Educator"}
            </button>

            <span>|</span>

            <Link to="/my-enrollments" className="text-xs">
              Enrollments
            </Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img
              src={assets.user_icon}
              alt="User"
              className="w-7 h-7"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;