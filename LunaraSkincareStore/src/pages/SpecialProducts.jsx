import React, { useState, useEffect } from 'react';
//eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import specialProductsData from '../data/specialproduct.json';
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

const SpecialProducts = () => {
  const { addToCart } = useCart(); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    specialType: 'all',
    priceRange: 'all',
    availability: 'all'
  });
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      specialProductsData.products.forEach(product => {
        if (product.isLimited && product.countdownDate) {
          const countdownDate = new Date(product.countdownDate).getTime();
          const now = new Date().getTime();
          const distance = countdownDate - now;

          if (distance < 0) {
            newTimeLeft[product.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
          } else {
            newTimeLeft[product.id] = {
              days: Math.floor(distance / (1000 * 60 * 60 * 24)),
              hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
          }
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //categories filters
  const categories = ['all', ...new Set(specialProductsData.products.map(p => p.category))];
  const specialTypes = ['all', ...new Set(specialProductsData.products.map(p => p.specialType))];

  //selected filters
  const filteredProducts = specialProductsData.products.filter(product => {
    const categoryMatch = filters.category === 'all' || product.category === filters.category;
    const typeMatch = filters.specialType === 'all' || product.specialType === filters.specialType;
    
    let priceMatch = true;
    if (filters.priceRange !== 'all') {
      const price = parseFloat(product.price.replace('$', ''));
      switch (filters.priceRange) {
        case 'under-100': priceMatch = price < 100; break;
        case '100-150': priceMatch = price >= 100 && price <= 150; break;
        case 'over-150': priceMatch = price > 150; break;
        default: priceMatch = true;
      }
    }

    let availabilityMatch = true;
    if (filters.availability !== 'all') {
      if (filters.availability === 'limited') {
        availabilityMatch = product.isLimited;
      } else if (filters.availability === 'available') {
        availabilityMatch = !product.isLimited || (product.isLimited && product.limitedStock > 0);
      }
    }
    
    return categoryMatch && typeMatch && priceMatch && availabilityMatch;
  });

  // Get featured products
  const featuredProducts = specialProductsData.products.filter(product => 
    specialProductsData.featuredProducts.includes(product.id)
  );

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    window.scrollTo(0, 0);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

   const handleAddToCart = (product) => {
    addToCart(product);
    //Show a success message or notification
    alert(`Added ${product.name} to cart!`);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({...filters, [filterType]: value});
    window.scrollTo(0, 0);
  };

  const clearAllFilters = () => {
    setFilters({ category: 'all', specialType: 'all', priceRange: 'all', availability: 'all' });
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryType) => {
    setFilters({...filters, specialType: categoryType});
    window.scrollTo(0, 0);
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

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Limited Edition': return 'bg-red-500';
      case 'Award Winner': return 'bg-yellow-500';
      case 'New Launch': return 'bg-green-500';
      case 'Bestseller': return 'bg-blue-500';
      case 'Exclusive Set': return 'bg-purple-500';
      case 'Rare Collection': return 'bg-pink-500';
      case 'Seasonal': return 'bg-orange-500';
      case 'Luxury': return 'bg-indigo-500';
      default: return 'bg-rose-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative h-80 flex items-center justify-center bg-gradient-to-r from-rose-200/40 via-amber-200/40 to-rose-200/40 dark:from-gray-800/60 dark:via-gray-700/60 dark:to-gray-800/60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/special.jpg")'
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
            {specialProductsData.category}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
            {specialProductsData.description}
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
              Special Collections
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our curated selection of extraordinary skincare experiences
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
          >
            {specialProductsData.categories.map((category) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="text-center group cursor-pointer"
                onClick={() => handleCategoryClick(category.type)}
              >
                <div className="w-20 h-20 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:bg-rose-200 dark:group-hover:bg-rose-800/50">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {category.description}
                </p>
                <span className="text-xs text-rose-600 dark:text-rose-400">
                  {category.count} products
                </span>
              </motion.div>
            ))}
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
              Featured Specials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our most exclusive and sought-after products
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${getBadgeColor(product.badge)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {product.badge}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Sale
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <span className="inline-block bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-base mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {product.isLimited && timeLeft[product.id] && (
                    <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <p className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-2">
                        ⏰ Limited Time Offer
                      </p>
                      <div className="flex gap-2 text-center">
                        <div className="flex-1">
                          <div className="text-lg font-bold text-gray-800 dark:text-white">{timeLeft[product.id].days}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold text-gray-800 dark:text-white">{timeLeft[product.id].hours}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold text-gray-800 dark:text-white">{timeLeft[product.id].minutes}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Mins</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Quick View
                    </button>
                  </div>
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
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Special Type
              </label>
              <select
                value={filters.specialType}
                onChange={(e) => handleFilterChange('specialType', e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                {specialTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
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
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under-100">Under $100</option>
                <option value="100-150">$100 - $150</option>
                <option value="over-150">Over $150</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              >
                <option value="all">All Products</option>
                <option value="limited">Limited Edition</option>
                <option value="available">In Stock</option>
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
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
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
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${getBadgeColor(product.badge)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                      {product.badge}
                    </span>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-3 right-3 bg-rose-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Sale
                    </div>
                  )}
                  {product.isLimited && product.limitedStock && (
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Only {product.limitedStock} left
                    </div>
                  )}
                </div>
                  {/* Product info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Limited Edition Countdown */}
                  {product.isLimited && timeLeft[product.id] && (
                    <div className="mb-4 p-2 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                      <p className="text-xs font-medium text-rose-600 dark:text-rose-400 mb-1">
                        Limited Time
                      </p>
                      <div className="flex gap-1 text-center text-xs">
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 dark:text-white">{timeLeft[product.id].days}d</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 dark:text-white">{timeLeft[product.id].hours}h</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-800 dark:text-white">{timeLeft[product.id].minutes}m</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No special products found matching your filters.
              </p>
              <button
                onClick={clearAllFilters}
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

      {/* Product Detail Modal */}
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
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-serif font-light text-gray-800 dark:text-white">
                      {selectedProduct.name}
                    </h2>
                    <span className={`inline-block ${getBadgeColor(selectedProduct.badge)} text-white px-3 py-1 rounded-full text-sm font-semibold mt-2`}>
                      {selectedProduct.badge}
                    </span>
                  </div>
                  <button
                    onClick={closeProductModal}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-80 object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProduct.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProduct.name} ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Product Details */}
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
                        Special Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Key Ingredients
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedProduct.isLimited && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                        <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                          ⚡ Limited Edition
                        </h4>
                        <p className="text-orange-600 dark:text-orange-400 text-sm">
                          Only {selectedProduct.limitedStock} items remaining. This exclusive product won't be available once sold out.
                        </p>
                        {timeLeft[selectedProduct.id] && (
                          <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                            <p className="text-sm font-medium text-gray-800 dark:text-white mb-2 text-center">
                              Time Remaining
                            </p>
                            <div className="flex gap-3 text-center">
                              <div className="flex-1">
                                <div className="text-xl font-bold text-gray-800 dark:text-white">{timeLeft[selectedProduct.id].days}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Days</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xl font-bold text-gray-800 dark:text-white">{timeLeft[selectedProduct.id].hours}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Hours</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xl font-bold text-gray-800 dark:text-white">{timeLeft[selectedProduct.id].minutes}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Minutes</div>
                              </div>
                              <div className="flex-1">
                                <div className="text-xl font-bold text-gray-800 dark:text-white">{timeLeft[selectedProduct.id].seconds}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Seconds</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedProduct.awards && (
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          🏆 Awards & Recognition
                        </h4>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                          {selectedProduct.awards.map((award, index) => (
                            <li key={index}>{award}</li>
                          ))}
                        </ul>
                      </div>
                    )}

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

                    {/* Add to Cart Button */}
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

export default SpecialProducts;