{/*import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
  return (
    <div>
      <nav  className="fixed top-0 left-0 w-full bg-white z-50 shadow-md h-16">
      


        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/"><li>Home</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/about"><li>About</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/login"><li>Login</li></NavLink>
        <NavLink className={(e)=>{return e.isActive?"red": "" }} to="/register"><li>Register</li></NavLink>
      </nav>
    </div>
  )
}

export default Navbar*/}
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-green-500 hover:text-yellow-300 transition duration-300 flex items-center gap-1"
        >
          🐟 <span className="text-green-500">Fish</span><span className="text-blue-300">Net</span>
        </Link>

        {/* Navigation Links with spacing */}
        <ul className="flex space-x-6">
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
  );
};

export default Navbar;
