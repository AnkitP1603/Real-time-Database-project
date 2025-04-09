import { useState, useEffect } from "react";
import {
  PaperAirplaneIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Load initial theme preference (optional)
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-black/20 border-b border-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Nav */}
          <div className="flex items-center gap-12">
            <a
              href="/"
              className="flex items-center gap-1 font-bold text-white text-xl"
            >
              {/* <PaperAirplaneIcon className="h-6 w-6 text-white" /> */}
              <span>Mission Impossible</span>
            </a>

            <div className="hidden lg:flex gap-8 text-white text-sm">
              <a href="#" className="hover:text-blue-400">Home</a>
              <a href="#" className="hover:text-blue-400">Benefits</a>
              <a href="#" className="hover:text-blue-400">Our Classes</a>
              <a href="#" className="hover:text-blue-400">Contact Us</a>
            </div>
          </div>

          {/* Right Side */}
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 transition-all duration-700 ease-in-out overflow-hidden ${
          toggleMenu ? "h-60 pt-16 px-8" : "h-0"
        }`}
      >
        <div className="flex flex-col gap-6 text-white font-semibold text-lg">
          <a href="#" className="hover:text-blue-400">Features</a>
          <a href="#" className="hover:text-blue-400">Pricing</a>
          <a href="#" className="hover:text-blue-400">Download</a>
          <a href="#" className="hover:text-blue-400">Classic</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
