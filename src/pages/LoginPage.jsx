import { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa6";
import { FaLock, FaLockOpen } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsername = Cookies.get('username');
    const storedPassword = Cookies.get('password');

    if (username === storedUsername && password === storedPassword) {
      navigate('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center py-12 bg-gray-800 min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-lg text-white p-8 rounded-xl shadow-lg mx-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        {/* Username */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 pr-12 text-white placeholder-white focus:outline-none"
          />
          <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-lg" />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 bg-transparent border border-white/20 rounded-full px-5 pr-12 text-white placeholder-white focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-lg focus:outline-none"
          >
            {showPassword ? <FaLockOpen /> : <FaLock />}
          </button>
        </div>

        {/* Remember and Forgot */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-white" />
            Remember me
          </label>
          <a href="#" className="hover:underline">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full h-11 bg-white text-gray-800 font-semibold rounded-full shadow hover:bg-gray-100 transition"
        >
          Login
        </button>

        {/* Signup */}
        <div className="text-sm text-center mt-6">
          <p>
            Don't have an account?{' '}
            <span
              className="font-semibold cursor-pointer hover:underline"
              onClick={handleSignupClick}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
