import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { HiMenu } from "react-icons/hi"; // For menu
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Cart Icon

// Dropdown Items as JSON
const categories = {
  mens: [
    { name: "Panjabi", link: "/category/panjabi" },
    { name: "Pajama", link: "/category/pajama" },
    { name: "T-Shirts", link: "/category/shirts" },
    { name: "Pants", link: "/category/pants" },
  ],
  womens: [
    { name: "Dresses", link: "/category/dresses" },
    { name: "Tops", link: "/category/tops" },
    { name: "Skirts", link: "/category/skirts" },
  ],
  kids: [
    { name: "Kids' Tops", link: "/category/kids-tops" },
    { name: "Kids' Pants", link: "/category/kids-pants" },
  ],
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMensDropdownOpen, setIsMensDropdownOpen] = useState(false);
  const [isWomensDropdownOpen, setIsWomensDropdownOpen] = useState(false);
  const [isKidsDropdownOpen, setIsKidsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch the logged-in user data and check if the token exists in localStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          const userId = decodedToken?.id;

          if (userId) {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.data.user) {
              setUser(response.data.user);
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="p-3 backdrop-blur-md bg-white/30 shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center lg:flex-row flex-row-reverse">

        {/* Logo */}
        <div className="flex items-center space-x-2 order-last lg:order-none">
          <img src="/Images/logo.jpg" alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        {/* Desktop Menu */}
        <div className="relative hidden lg:flex items-center space-x-6">
          {/* Men's Items Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsMensDropdownOpen(true)}
            onMouseLeave={() => setIsMensDropdownOpen(false)}
          >
            <button className="text-[#8d5c51] hover:text-[#a0926c] transition duration-200 text-lg font-semibold">
              Men's Items
            </button>
            <div
              className={`absolute left-0 mt-2 space-y-2 bg-white shadow-lg w-48 border rounded-md transition-all duration-500 ease-in-out ${isMensDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              {categories.mens.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Women's Items Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsWomensDropdownOpen(true)}
            onMouseLeave={() => setIsWomensDropdownOpen(false)}
          >
            <button className="text-[#8d5c51] hover:text-[#a0926c] transition duration-200 text-lg font-semibold">
              Women's Items
            </button>
            <div
              className={`absolute left-0 mt-2 space-y-2 bg-white shadow-lg w-48 border rounded-md transition-all duration-500 ease-in-out ${isWomensDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              {categories.womens.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Kid's Items Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsKidsDropdownOpen(true)}
            onMouseLeave={() => setIsKidsDropdownOpen(false)}
          >
            <button className="text-[#8d5c51] hover:text-[#a0926c] transition duration-200 text-lg font-semibold">
              Kid's Items
            </button>
            <div
              className={`absolute left-0 mt-2 space-y-2 bg-white shadow-lg w-48 border rounded-md transition-all duration-500 ease-in-out ${isKidsDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            >
              {categories.kids.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            className="text-[#8d5c51] text-3xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiMenu />
          </button>
        </div>

        {/* Cart and Avatar/ Login */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart" className="flex items-center">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="w-6 h-6 text-[#8d5c51] hover:text-[#a0926c] transition-all duration-200"
            />
          </Link>

          {/* Avatar or Login/Signup */}
          {isLoggedIn ? (
            <span className="w-7 h-7 flex items-center justify-center text-white bg-[#8d5c51] rounded-full text-xl">
              {user?.fullname?.[0]}
            </span>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="text-[#8d5c51] hover:text-[#a0926c] transition duration-200 text-lg font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[#8d5c51] hover:text-[#a0926c] transition duration-200 text-lg font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white px-6 py-4 space-y-4 border-t">
          {/* Men's Items */}
          <div className="space-y-2">
            <button
              className="w-full text-left text-lg text-[#8d5c51] font-semibold"
              onClick={() => setIsMensDropdownOpen(!isMensDropdownOpen)}
            >
              Men's Items
            </button>
            {isMensDropdownOpen && (
              <div className="space-y-2">
                {categories.mens.map((item) => (
                  <Link
                    to={item.link}
                    key={item.name}
                    className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Women's Items */}
          <div className="space-y-2">
            <button
              className="w-full text-left text-lg text-[#8d5c51] font-semibold"
              onClick={() => setIsWomensDropdownOpen(!isWomensDropdownOpen)}
            >
              Women's Items
            </button>
            {isWomensDropdownOpen && (
              <div className="space-y-2">
                {categories.womens.map((item) => (
                  <Link
                    to={item.link}
                    key={item.name}
                    className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Kid's Items */}
          <div className="space-y-2">
            <button
              className="w-full text-left text-lg text-[#8d5c51] font-semibold"
              onClick={() => setIsKidsDropdownOpen(!isKidsDropdownOpen)}
            >
              Kid's Items
            </button>
            {isKidsDropdownOpen && (
              <div className="space-y-2">
                {categories.kids.map((item) => (
                  <Link
                    to={item.link}
                    key={item.name}
                    className="block px-5 py-3 text-[#8d5c51] hover:bg-[#a0926c] hover:text-white border-b hover:border-[#a0926c] transition duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
