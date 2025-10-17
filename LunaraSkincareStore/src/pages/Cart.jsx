import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();
  
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit-card'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    // Validate form
    if (!customerInfo.fullName || !customerInfo.email || !customerInfo.address) {
      alert('Please fill in all required fields');
      return;
    }
    setShowReceipt(true);
  };

  // Function to save order data to text file
  const saveOrderToFile = () => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const orderDate = new Date().toLocaleString();
    
    // Create the text content
    const textContent = `
ORDER CONFIRMATION
==================

Order Details:
--------------
Order ID: ${orderId}
Order Date: ${orderDate}
Payment Method: ${customerInfo.paymentMethod}
Status: Confirmed

Customer Information:
--------------------
Name: ${customerInfo.fullName}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
City: ${customerInfo.city || 'N/A'}
ZIP Code: ${customerInfo.zipCode || 'N/A'}

Order Items:
------------
${cartItems.map(item => {
  const itemTotal = parseFloat(item.price.replace('$', '')) * item.quantity;
  return `${item.name} x ${item.quantity} - $${itemTotal.toFixed(2)}`;
}).join('\n')}

Order Summary:
--------------
Subtotal: $${getCartTotal().toFixed(2)}
Shipping: ${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
Tax: $${tax.toFixed(2)}
Total: $${total.toFixed(2)}

Thank you for your purchase!
============================
    `.trim();

    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order_${orderId}.txt`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const printReceipt = () => {
    window.print();
  };

  const completeOrder = () => {
    saveOrderToFile();
    
    // send the order to your backend
    alert('Order completed successfully! Your order details have been saved.');
    clearCart();
    setShowReceipt(false);
    setShowCheckoutForm(false);
    navigate('/');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 2.99;
  const tax = subtotal * 0.005; // 0.5% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0 && !showReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Add some products to get started!
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Previous Page
          </button>
        </div>
      </div>
    );
  }

  if (showReceipt) {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 print:bg-white print:pt-0">
        <div className="max-w-4xl mx-auto p-6 print:p-0 print:max-w-none print:mx-0">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 print:shadow-none print:border-none print:rounded-none print:p-4">
            <div className="text-center mb-8 print:mb-4">
              <h1 className="text-3xl font-serif font-light text-gray-800 dark:text-white print:text-black print:text-2xl">
                Order Confirmation
              </h1>
              <p className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">
                Thank you for your purchase!
              </p>
              <p className="text-sm text-gray-500 print:text-black print:text-xs">
                Order Date: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8 print:mb-4 print:grid-cols-2 print:gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white print:text-black print:text-base print:mb-2">
                  Customer Information
                </h3>
                <p className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">
                  <strong>Name:</strong> {customerInfo.fullName}<br />
                  <strong>Email:</strong> {customerInfo.email}<br />
                  <strong>Phone:</strong> {customerInfo.phone}<br />
                  <strong>Address:</strong> {customerInfo.address}<br />
                  {customerInfo.city && <><strong>City:</strong> {customerInfo.city}<br /></>}
                  {customerInfo.zipCode && <><strong>ZIP Code:</strong> {customerInfo.zipCode}</>}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white print:text-black print:text-base print:mb-2">
                  Order Summary
                </h3>
                <p className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">
                  <strong>Order ID:</strong> #{orderId}<br />
                  <strong>Payment Method:</strong> {customerInfo.paymentMethod}<br />
                  <strong>Status:</strong> <span className="text-green-600 print:text-black">Confirmed</span>
                </p>
              </div>
            </div>

            <div className="mb-6 print:mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white print:text-black print:text-base print:mb-2">
                Order Items
              </h3>
              <div className="space-y-3 print:space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2 print:pb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                    <span className="text-gray-800 dark:text-white print:text-black print:text-sm font-semibold">
                      ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 print:pt-2">
              <div className="space-y-2 print:space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">Subtotal:</span>
                  <span className="text-gray-800 dark:text-white print:text-black print:text-sm">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">Shipping:</span>
                  <span className="text-gray-800 dark:text-white print:text-black print:text-sm">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300 print:text-black print:text-sm">Tax:</span>
                  <span className="text-gray-800 dark:text-white print:text-black print:text-sm">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 dark:border-gray-600 pt-2 print:pt-1 print:text-base">
                  <span className="text-gray-800 dark:text-white print:text-black">Total:</span>
                  <span className="text-rose-600 dark:text-rose-400 print:text-black">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 print:hidden">
              <button
                onClick={printReceipt}
                className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
              >
                Print Receipt
              </button>
              <button
                onClick={saveOrderToFile}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Save as Text File
              </button>
              <button
                onClick={completeOrder}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          @media print {
            /* Hide navigation, footer, and other page elements */
            header, footer, nav, .print\\:hidden {
              display: none !important;
            }
            
            /* Ensure the receipt takes full page */
            body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            /* Remove any margins and padding from main container */
            .min-h-screen {
              min-height: auto !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            
            /* Ensure text is black for printing */
            * {
              color: black !important;
            }
          }
        `}</style>
      </div>
    );
  }

  // Checkout Form View
  if (showCheckoutForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
            <h2 className="text-3xl font-serif font-light text-gray-800 dark:text-white mb-6 text-center">
              Checkout
            </h2>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={customerInfo.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Shipping Address
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={customerInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Payment Method
                </h3>
                <select
                  name="paymentMethod"
                  value={customerInfo.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="credit-card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank-transfer">Bank Transfer</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:from-rose-600 hover:to-amber-600 transition-all duration-300"
                >
                  Proceed to Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-light text-gray-800 dark:text-white">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-rose-600 dark:text-rose-400 font-bold">
                    {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center text-xl font-semibold mb-4">
            <span className="text-gray-800 dark:text-white">Total:</span>
            <span className="text-rose-600 dark:text-rose-400">
              ${getCartTotal().toFixed(2)}
            </span>
          </div>
          
          <button 
            onClick={() => setShowCheckoutForm(true)}
            className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-rose-600 hover:to-amber-600 transition-all duration-300 mb-3"
          >
            Checkout
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;