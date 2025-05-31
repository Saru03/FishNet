import React from 'react';
import { Link } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { useAuth } from '../context/AuthContext';
const LoginSignup = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-[#1e293b] border border-gray-600 rounded-2xl shadow-2xl p-10 space-y-8">
        <h1 className="text-4xl text-white font-bold text-center">Login</h1>

        <form className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              required
              placeholder="Your Email"
              className="w-full text-white bg-transparent border border-gray-400 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-blue-500"
            />
            <BiUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              required
              placeholder="Your Password"
              className="w-full text-white bg-transparent border border-gray-400 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-blue-500"
            />
            <AiOutlineUnlock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm pt-2">
            <div className="flex items-center gap-2">
              <input id="remember" type="checkbox" className="accent-blue-500 w-4 h-4" />
              <label htmlFor="remember" className="text-white">Remember Me</label>
            </div>
            <Link to="#" className="text-blue-400 hover:underline">Forgot Password?</Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full text-lg font-semibold bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white transition duration-300 mt-2"
          >
            Login
          </button>

          {/* Signup Link */}
          <div className="text-center text-white text-base pt-2">
            New Here? <Link to="/Register" className="text-blue-400 hover:underline">Create an Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
  const { login } = useAuth();
login(); 
};

export default LoginSignup;
