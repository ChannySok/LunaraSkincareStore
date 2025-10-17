import React, { useState, useEffect } from 'react';
//eslint-disable-next-line no-unused-vars   
import { motion, AnimatePresence } from 'framer-motion';
import skincareRoutineData from '../data/skincareroutine.json';
import { useCart } from '@/context/CartContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const SkincareRoutine = () => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    step: 'all',
    skinType: 'all',
    priceRange: 'all',
    time: 'all'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = ['all', ...new Set(skincareRoutineData.products.map(p => p.step))];
  const skinTypes = ['all', ...new Set(skincareRoutineData.products.flatMap(p => p.skinType))];
  const times = ['all', ...new Set(skincareRoutineData.products.map(p => p.time))];

  // Filter products based on selected filters
  const filteredProducts = skincareRoutineData.products.filter(product => {
    const stepMatch = filters.step === 'all' || product.step === filters.step;
    const skinTypeMatch = filters.skinType === 'all' || product.skinType.includes(filters.skinType);
    const timeMatch = filters.time === 'all' || product.time === filters.time;
    
    let priceMatch = true;
    if (filters.priceRange !== 'all') {
      const price = parseFloat(product.price.replace('$', ''));
      switch (filters.priceRange) {
        case 'under-30': priceMatch = price < 30; break;
        case '30-50': priceMatch = price >= 30 && price <= 50; break;
        case 'over-50': priceMatch = price > 50; break;
        default: priceMatch = true;
      }
    }
    
    return stepMatch && skinTypeMatch && priceMatch && timeMatch;
  });

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

   const handleAddToCart = (product) => {
    addToCart(product);
    // Optional: Show a success message or notification
    alert(`Added ${product.name} to cart!`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < Math.floor(rating) 
            ? 'text-yellow-400' 
            : index < rating 
            ? 'text-yellow-300' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative h-80 flex items-center justify-center bg-gradient-to-r from-rose-200/40 via-amber-200/40 to-rose-200/40 dark:from-gray-800/60 dark:via-gray-700/60 dark:to-gray-800/60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/skincareroutine.jpg")'
          }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white mb-4 tracking-tight">
            Skincare Routine
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
            Build your perfect daily regimen for healthy, glowing skin
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-light text-gray-800 dark:text-white mb-4">
              Your Daily Routine Guide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Follow these steps for a complete skincare regimen tailored to your needs
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-serif font-light text-rose-600 dark:text-rose-400 mb-8 text-center">
              ☀️ Morning Routine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {skincareRoutineData.routineSteps.morning.map((step) => (
                <motion.div
                  key={step.step}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {step.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {step.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif font-light text-indigo-600 dark:text-indigo-400 mb-8 text-center">
              🌙 Evening Routine
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {skincareRoutineData.routineSteps.evening.map((step) => (
                <motion.div
                  key={step.step}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-4 mx-auto">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {step.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {step.description}
                  </p>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tips:</p>
                    <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      {step.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white/50 dark:bg-gray-800/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-light text-gray-800 dark:text-white mb-4">
              Skin Type Guides
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Find the perfect routine recommendations for your specific skin type
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {skincareRoutineData.skinTypeGuides.map((guide) => (
              <motion.div
                key={guide.type}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-xl">
                    {guide.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {guide.type}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {guide.description}
                </p>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white mb-2">Recommended:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {guide.routine.map((product, index) => (
                      <li key={index}>• {product}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Routine Step
              </label>
              <select
                value={filters.step}
                onChange={(e) => setFilters({...filters, step: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {steps.map(step => (
                  <option key={step} value={step}>
                    {step === 'all' ? 'All Steps' : step}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Skin Type
              </label>
              <select
                value={filters.skinType}
                onChange={(e) => setFilters({...filters, skinType: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {skinTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Skin Types' : type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time of Use
              </label>
              <select
                value={filters.time}
                onChange={(e) => setFilters({...filters, time: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {times.map(time => (
                  <option key={time} value={time}>
                    {time === 'all' ? 'Any Time' : time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-30">Under $30</option>
                <option value="30-50">$30 - $50</option>
                <option value="over-50">Over $50</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Sale
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {product.time}
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs px-2 py-1 rounded-full">
                        {product.step}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-bold text-rose-600 dark:text-rose-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-2 rounded-lg font-semibold text-sm hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No products found matching your filters.
              </p>
              <button
                onClick={() => setFilters({ step: 'all', skinType: 'all', priceRange: 'all', time: 'all' })}
                className="mt-4 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-rose-500 to-amber-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={closeProductModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-serif font-light text-gray-800 dark:text-white">
                    {selectedProduct.name}
                  </h2>
                  <button
                    onClick={closeProductModal}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full rounded-2xl shadow-lg"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                        {selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                          {selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {renderStars(selectedProduct.rating)}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {selectedProduct.rating} • {selectedProduct.reviews} reviews
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedProduct.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Key Ingredients
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Benefits
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                        {selectedProduct.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                          Skin Type
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProduct.skinType.map((type) => (
                            <span
                              key={type}
                              className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                          Size
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedProduct.size}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                          Routine Step
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedProduct.step}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                          Best Time
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedProduct.time}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        closeProductModal();
                      }}
                      className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Add to Cart - {selectedProduct.price}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkincareRoutine;