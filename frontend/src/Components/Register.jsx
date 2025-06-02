import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BiUser, BiEnvelope } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('loggedIn', 'true');

    alert('Registered successfully! You are now logged in.');
    navigate('/inventory');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-gradient-to-br from-blue-500 to-cyan-700 border border-gray-600 rounded-2xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl text-white font-bold text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-white bg-transparent border border-gray-300 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-cyan-300"
            />
            <BiUser className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-white bg-transparent border border-gray-300 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-cyan-300"
            />
            <BiEnvelope className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-white bg-transparent border border-gray-300 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-cyan-300"
            />
            <AiOutlineUnlock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full text-white bg-transparent border border-gray-300 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-cyan-300"
            />
            <AiOutlineUnlock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full text-lg font-semibold bg-white text-blue-700 hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Register
          </button>

          <div className="text-center text-white text-base pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-200 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
