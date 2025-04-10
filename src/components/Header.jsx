import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    logout(); // uses context
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-gray-900/60 dark:bg-black/20 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-12">
              <a href="/" className="flex items-center gap-1 font-bold text-white text-xl">
                <span>Mission Impossible</span>
              </a>

              <div className="hidden lg:flex gap-8 text-white text-sm">
                {isLoggedIn ? (
                  <>
                    <a href="/home" className="hover:text-blue-400">Home</a>
                    <a href="/logs" className="hover:text-blue-400">Logs</a>
                    <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="hover:text-blue-400"
                    >
                      LogOut
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login" className="hover:text-blue-400">Login</a>
                    <a href="/signup" className="hover:text-blue-400">SignUp</a>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                <MoonIcon
                  className={`h-5 w-5 cursor-pointer ${!darkMode ? "text-yellow-300" : "text-white"}`}
                  onClick={toggleDarkMode}
                />
                <SunIcon
                  className={`h-5 w-5 cursor-pointer ${darkMode ? "text-yellow-400" : "text-white"}`}
                  onClick={toggleDarkMode}
                />
              </div>

              <button className="hidden xs:flex rounded-full border-2 border-white px-4 py-1 text-sm hover:bg-white hover:text-black transition">
                Free Trial
              </button>

              <div className="lg:hidden">
                <button onClick={() => setToggleMenu(!toggleMenu)}>
                  {toggleMenu ? (
                    <XMarkIcon className="h-6 w-6 text-white" />
                  ) : (
                    <Bars3Icon className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 transition-all duration-700 ease-in-out overflow-hidden ${
            toggleMenu ? "h-60 pt-16 px-8" : "h-0"
          }`}
        >
          <div className="flex flex-col gap-6 text-white font-semibold text-lg">
            {isLoggedIn ? (
              <>
                <a href="/home" className="hover:text-blue-400">Home</a>
                <a href="/logs" className="hover:text-blue-400">Logs</a>
                <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="hover:text-blue-400 text-left"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="hover:text-blue-400">Login</a>
                <a href="/signup" className="hover:text-blue-400">Signup</a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Logout confirmation modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
