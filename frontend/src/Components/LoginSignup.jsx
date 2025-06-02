import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnlock } from 'react-icons/ai';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirectTo') || '/';

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      // If remember me checked, save username in localStorage, else remove it
      if (rememberMe) {
        localStorage.setItem('rememberedUsername', username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      localStorage.setItem('loggedIn', 'true');
      alert('Login successful!');
      navigate(redirectTo);
    } else {
      alert('Invalid username or password!');
    }
  };

  // Load remembered username on mount
  React.useEffect(() => {
    const remembered = localStorage.getItem('rememberedUsername');
    if (remembered) {
      setUsername(remembered);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-gradient-to-br from-blue-500 to-cyan-700 border border-gray-600 rounded-2xl shadow-2xl p-10 space-y-8">
        <h2 className="text-4xl text-white font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
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
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-white bg-transparent border border-gray-300 rounded-md py-3 px-4 pr-12 text-base focus:outline-none focus:border-cyan-300"
            />
            <AiOutlineUnlock className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-xl" />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-white text-sm">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 focus:ring-cyan-300"
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="hover:underline text-cyan-200">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full text-lg font-semibold bg-white text-blue-700 hover:bg-blue-500 hover:text-white transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-white text-base pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-200 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
