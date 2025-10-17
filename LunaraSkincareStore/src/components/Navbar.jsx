import ThemeContext from "@/context/ThemeContext";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSunny, IoMenu, IoClose, IoChevronDown, IoCart } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const mobileProductRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemsCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!mobileProductRef.current ||
          !mobileProductRef.current.contains(event.target))
      ) {
        setIsProductDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (link) => {
    const sectionId = link.to.replace("/", "");

    if (location.pathname === "/home") {
      scrollToSection(sectionId);
    } else {
      navigate("/home");
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  // handle function on cart icon click
  const handleCartClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    //small delay to ensure scroll completes
    setTimeout(() => {
      navigate("/cart");
    }, 300);
  };

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/aboutus", label: "About Us" },
    {
      label: "Product",
      dropdown: [
        { to: "/product/bodycare", label: "Body Care" },
        { to: "/product/specialproducts", label: "Special Products" },
        { to: "/product/treatmentandcare", label: "Treatment & Care" },
        { to: "/product/skincareroutine", label: "Skincare Routine" },
      ],
    },
    { to: "/service", label: "Service" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-pink-300/95 dark:bg-gray-900 backdrop-blur-md shadow-lg"
          : "bg-pink-300 dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4 sm:px-6">
        <section>
          <Link to="/home">
            <img
              id="home"
              src="/logocover.jpg"
              alt="logo"
              className="h-12 sm:h-14 lg:h-18 p-2 bg-amber-50 rounded-full object-cover cursor-default"
            />
          </Link>
        </section>
        <section className="hidden lg:flex space-x-6 font-semibold text-lg items-center min-w-max">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative group"
              ref={link.dropdown ? dropdownRef : null}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setIsProductDropdownOpen(!isProductDropdownOpen)
                    }
                    className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-lg whitespace-nowrap"
                  >
                    {link.label}
                    <IoChevronDown className="text-sm" />
                  </button>

                  {isProductDropdownOpen && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.to}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-pink-400 hover:rounded-full dark:hover:bg-blue-600 transition ease-in-out duration-300 whitespace-nowrap"
                          onClick={() => setIsProductDropdownOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => handleNavClick(link)}
                  className="hover:text-blue-600 dark:hover:text-blue-300 transition-colors whitespace-nowrap"
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}
        </section>

        <section className="flex items-center gap-2 sm:gap-4 font-medium text-base sm:text-lg">
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-1 text-xl sm:text-2xl hover:scale-110 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <IoSunny /> : <IoIosMoon />}
          </button>

          <button
            className="flex items-center gap-1 sm:gap-2 cursor-pointer p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md relative"
            aria-label="Shopping cart"
            onClick={handleCartClick}
          >
            <IoCart className="text-lg sm:text-xl text-gray-700 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {getCartItemsCount()}
            </span>
          </button>

          <button
            onClick={toggleMenu}
            className="lg:hidden cursor-pointer p-1 text-2xl ml-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </button>

          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              setTimeout(() => {
                navigate("/customer-info");
              }, 300);
            }}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
            aria-label="View customer profile"
          >
            <img
              src="/user.jpg"
              alt="profile"
              className="h-8 sm:h-6 lg:h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-rose-400"
            />
          </button>
        </section>
      </div>

      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-pink-300 dark:bg-blue-700 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md" : ""
        }`}
      >
        <div className="px-4 py-3 space-y-3 font-semibold">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.dropdown ? (
                <div className="space-y-2" ref={mobileProductRef}>
                  <button
                    onClick={() =>
                      setIsProductDropdownOpen(!isProductDropdownOpen)
                    }
                    className="flex items-center gap-2 w-full text-left py-2 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                  >
                    {link.label}
                    <IoChevronDown className="text-sm" />
                  </button>

                  {isProductDropdownOpen && (
                    <div className="ml-4 space-y-2 border-l-2 border-blue-400 dark:border-blue-600 pl-4">
                      {link.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.to}
                          className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                          onClick={() => {
                            setIsProductDropdownOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick(link)}
                  className="block w-full text-left py-2 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
