import React, { useState, useEffect } from "react";
import jsonData from "../data/products.json";
import AboutUs from "./AboutUs";
import Service from "./Service";
import Contact from "./Contact";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [brandInfo, setBrandInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setProducts(jsonData.products);
        setBrandInfo(jsonData.brandInfo);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  //scroll to section when URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }
    };

    // Check for hash on initial load
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 dark:border-rose-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading beautiful products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="py-8 px-4 pt-20">
        {" "}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-800 dark:text-white mb-4 tracking-tight">
            {brandInfo.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light">
            {brandInfo.tagline}
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="break-inside-avoid mb-4 group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105 bg-white dark:bg-gray-800"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ maxHeight: "400px" }}
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 ease-in-out flex items-end justify-center">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screen">
        <div id="aboutus">
          <AboutUs />
        </div>

        <div id="service">
          <Service />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;