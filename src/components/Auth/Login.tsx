import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import Swal from 'sweetalert2';

library.add(faKey, faEnvelope);

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('superadmin@quicrefill.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');

  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
  });

  // Effect to check for messages from navigation state (for reset password success)
  useEffect(() => {
    if (location.state && location.state.successMessage) {
      Toast.fire({
        icon: 'success',
        title: location.state.successMessage
      });
      // Clear the state so the message doesn't reappear
      window.history.replaceState({}, document.title);
    }
  }, [location.state, Toast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (email === 'superadmin@quicrefill.com' && password === 'password') {
      const userId = `admin_${Math.random().toString(36).substring(2, 11)}`;
      onLogin(userId); // This sets isLoggedIn to true in App.js
      // After successful login and state update in App.js, navigate to dashboard
      navigate('/dashboard'); // Redirect to the dashboard path
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side - Image Background */}
      <div
        className="hidden md:block w-full md:w-[50%] h-screen bg-gray-100 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/loginpage.png')" }}
      ></div>

      {/* Right Side - Login Content */}
      <div className="w-full md:w-[40%] flex flex-col">
        {/* Header with Logo */}
        <header className="p-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="images/logo.png" alt="Quicrefill Logo" className="w-[150px] md:w-[150px]" />
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-500 mr-2">Don't have an account?</span>
            <a href="#" className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm hover:bg-gray-700">
              Request access
            </a>
          </div>
        </header>

        {/* Login Form */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-8">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-yellow-500 text-center mb-6">Sign In</h1>

            <h2 className="text-xl font-semibold text-gray-800 mb-1">Admin Dashboard</h2>
            <p className="text-gray-500 text-sm mb-6">Please enter your login details below.</p>

            {error && (
              <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FontAwesomeIcon icon={faKey} className="mr-2 text-sm" />
                Sign in to admin
              </button>

              <div className="mt-4 text-center text-sm">
                <span className="text-gray-600">Can't remember the password?</span>
                <Link to="/reset-password" className="text-yellow-500 hover:underline ml-1">
                  Reset password
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 flex justify-between items-center text-gray-500 text-sm mt-auto">
          <div>© Quicrefill Company 2025</div>
          <a href="mailto:help@quicrefill.com" className="flex items-center hover:text-gray-700">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            help@quicrefill.com
          </a>
        </footer>
      </div>

      {/* Right Side - Empty Space */}
      <div className="hidden md:block w-full md:w-[10%] bg-white"></div>
    </div>
  );
};

export default Login;