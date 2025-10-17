import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const CustomerInfo = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    dateJoined: "",
    totalOrders: 0,
    loyaltyPoints: 0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const orderHistory = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      items: ["Rose Quartz Facial Serum", "Hyaluronic Acid Moisturizer"],
      total: "$125.00",
      status: "Delivered",
      checkoutDate: "2024-01-14"
    },
    {
      id: "ORD-002",
      date: "2024-01-08",
      items: ["Vitamin C Brightening Cream", "AHA/BHA Exfoliating Toner"],
      total: "$89.50",
      status: "Delivered",
      checkoutDate: "2024-01-07"
    },
    {
      id: "ORD-003",
      date: "2024-01-02",
      items: ["Ceramide Repair Cream", "Green Tea Cleanser", "Sunscreen SPF 50"],
      total: "$156.75",
      status: "Delivered",
      checkoutDate: "2024-01-01"
    },
    {
      id: "ORD-004",
      date: "2023-12-20",
      items: ["Retinol Night Serum", "Peptide Eye Cream"],
      total: "$112.25",
      status: "Delivered",
      checkoutDate: "2023-12-19"
    },
    {
      id: "ORD-005",
      date: "2023-12-10",
      items: ["Charcoal Detox Mask", "Aloe Vera Gel", "Face Massager"],
      total: "$78.90",
      status: "Delivered",
      checkoutDate: "2023-12-09"
    }
  ];

  useEffect(() => {
    const mockCustomerData = {
      fullName: "Sok Channy",
      email: "sok.channy@gmail.com",
      phone: "+(885) 96 456 789",
      address: "#358 st.07 Phnom Penh",
      city: "Phnom Penh",
      zipCode: "12101",
      dateJoined: "2025-10-16",
      totalOrders: 12,
      loyaltyPoints: 450,
    };
    setCustomerData(mockCustomerData);
    setEditedData(mockCustomerData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setCustomerData(editedData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedData(customerData);
    setIsEditing(false);
  };

  const handleViewOrderHistory = () => {
    setShowOrderHistory(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/user.jpg"
                alt="Customer Profile"
                className="w-48 h-auto rounded-full object-cover border-4 border-rose-200 dark:border-rose-800 shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your personal information and preferences
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Personal Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Contact Details
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={editedData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {customerData.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {customerData.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {customerData.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Address & Statistics
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-600 dark:text-gray-300">
                      {customerData.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={editedData.city}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {customerData.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="zipCode"
                        value={editedData.zipCode}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {customerData.zipCode}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                      {customerData.totalOrders}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Total Orders
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                      {customerData.loyaltyPoints}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Loyalty Points
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Member since{" "}
                    {new Date(customerData.dateJoined).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Recent Orders
            </h3>
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View your complete order history
              </p>
              <button
                onClick={handleViewOrderHistory}
                className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-2 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
              >
                View Order History
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Previous Page
            </button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showOrderHistory && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderHistory(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-rose-400 to-amber-500 dark:from-rose-600 dark:to-amber-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-serif font-light">
                    Order History
                  </h2>
                  <button
                    onClick={() => setShowOrderHistory(false)}
                    className="text-white hover:text-gray-200 text-2xl transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
                <p className="text-white/90 mt-2">
                  Your complete order history after checkout
                </p>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  {orderHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {order.id}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Checkout Date: {new Date(order.checkoutDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
                            {order.total}
                          </p>
                          <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full text-xs font-semibold">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Items Purchased:
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                          {order.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center">
                              <span className="w-2 h-2 bg-rose-400 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                        <span>Delivery Date: {new Date(order.date).toLocaleDateString()}</span>
                        <button className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors duration-300">
                          View Details →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {orderHistory.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-500 dark:text-rose-400 text-3xl mx-auto mb-4">
                      📦
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      No Orders Yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Start shopping to see your order history here!
                    </p>
                    <button
                      onClick={() => {
                        setShowOrderHistory(false);
                        navigate('/product/bodycare');
                      }}
                      className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm p-4 border-t border-gray-200/50 dark:border-gray-600/50">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Showing {orderHistory.length} orders
                  </p>
                  <button
                    onClick={() => setShowOrderHistory(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerInfo;