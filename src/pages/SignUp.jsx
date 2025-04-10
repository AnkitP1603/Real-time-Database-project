'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const res = await fetch('https://mib-backend-uuga.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Signup failed');

    //   alert('Signup successful!');
      navigate("/login")
    } catch (err) {
      console.error(err);
      alert(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 pl-10 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? <FaLockOpen /> : <FaLock />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <span
              className="text-blue-600 hover:underline font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
