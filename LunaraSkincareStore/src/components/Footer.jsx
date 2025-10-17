import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-600 dark:text-gray-300 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
            Lunara Store
          </h2>
          <p className="text-sm leading-6 dark:text-gray-400">
            Let your skin glow as gently as the moonlight — pure, calm, and timeless.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            {["Serum", "Face Mask", "Sun and Night cream", "Clay Mask", "Body Scrub"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2 text-sm">
            {["Help Center", "Returns", "Warranty", "Track Order"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
            Stay Connected
          </h3>
          <p className="text-sm mb-4 dark:text-gray-400">
            Subscribe to our newsletter and never miss a deal.
          </p>
          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 border border-gray-300 dark:border-gray-700"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-pink-500 px-4 md:px-5 py-2 rounded-r-xl text-white font-medium transition-colors duration-200"
            >
              Subcribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-200"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors duration-200"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors duration-200"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 md:mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Lunara Cosmestic Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;