import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-600 shadow-md fixed top-0 left-0 right-0 z-50 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-extrabold text-green-500 hover:text-yellow-300 transition duration-300 flex items-center gap-1"
          >
            🐟 <span className="text-green-500">Fish</span>
            <span className="text-blue-300">Net</span>
          </Link>

          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="text-white hover:text-yellow-200 font-medium transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-yellow-200 font-medium transition duration-200"
              >
                About
              </Link>
            </li>

            {loggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-200 font-medium transition duration-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-white hover:text-yellow-200 font-medium transition duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white hover:text-yellow-200 font-medium transition duration-200"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link
                to="/contact"
                className="text-white hover:text-yellow-200 font-medium transition duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
