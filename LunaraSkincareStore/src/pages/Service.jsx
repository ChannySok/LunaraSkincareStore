import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'Facial Treatment',
    description: 'Customized facial treatments tailored to your skin type and concerns for a radiant, healthy glow.',
    icon: '✨',
    color: 'from-purple-400 to-pink-500',
    darkColor: 'from-purple-600 to-pink-700'
  },
  {
    id: 2,
    title: 'Body Care',
    description: 'Full-body treatments including scrubs, wraps, and moisturizing therapies for silky smooth skin.',
    icon: '🌟',
    color: 'from-blue-400 to-cyan-500',
    darkColor: 'from-blue-600 to-cyan-700'
  },
  {
    id: 3,
    title: 'Therapeutic Massage',
    description: 'Relaxing and therapeutic massage techniques to relieve stress and improve circulation.',
    icon: '💆‍♀️',
    color: 'from-green-400 to-emerald-500',
    darkColor: 'from-green-600 to-emerald-700'
  },
  {
    id: 4,
    title: 'Skin Consultation',
    description: 'Professional skin analysis and personalized skincare routine recommendations.',
    icon: '🔍',
    color: 'from-amber-400 to-orange-500',
    darkColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 5,
    title: 'Acne Treatment',
    description: 'Specialized treatments and products to combat acne and prevent future breakouts.',
    icon: '🌸',
    color: 'from-rose-400 to-red-500',
    darkColor: 'from-rose-600 to-red-700'
  },
  {
    id: 6,
    title: 'Anti-Aging Care',
    description: 'Advanced treatments to reduce fine lines, wrinkles, and promote youthful-looking skin.',
    icon: '⏳',
    color: 'from-indigo-400 to-purple-500',
    darkColor: 'from-indigo-600 to-purple-700'
  }
];

const whyChooseUs = [
  {
    id: 1,
    title: 'Professional Experts',
    description: 'Our certified skincare specialists have years of experience and ongoing training.',
    icon: '🎓'
  },
  {
    id: 2,
    title: 'Natural Products',
    description: 'We use only the finest natural, cruelty-free ingredients in all our treatments.',
    icon: '🌿'
  },
  {
    id: 3,
    title: 'Relaxing Environment',
    description: 'Enjoy our serene, clean, and comfortable spa environment designed for your relaxation.',
    icon: '🏝️'
  },
  {
    id: 4,
    title: 'Customized Solutions',
    description: 'Every treatment is personalized to meet your unique skin needs and goals.',
    icon: '🎯'
  }
];

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Service = () => {
  // eslint-disable-next-line
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookAppointment = () => {
    alert('Booking functionality coming soon!');
    window.scrollTo(0, 0);
  };

  const handleLearnMore = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div id="service" className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-rose-200/40 via-amber-200/40 to-rose-200/40 dark:from-gray-800/60 dark:via-gray-700/60 dark:to-gray-800/60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-light text-white mb-4 tracking-tight">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">
            Discover our premium skincare treatments designed to rejuvenate and transform your skin
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
              Premium Skincare Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the perfect blend of science and nature with our comprehensive range of skincare treatments
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} dark:${service.darkColor} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button 
                  onClick={handleLearnMore}
                  className="text-rose-600 dark:text-rose-400 font-medium hover:text-rose-700 dark:hover:text-rose-300 transition-colors duration-300"
                >
                  Learn More →
                </button>
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
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are committed to providing you with the best skincare experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-rose-400 to-amber-500 dark:from-rose-600 dark:to-amber-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
              Ready for Radiant Skin?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your consultation today and let our experts create a personalized skincare journey just for you
            </p>
            <div className="flex justify-center">
              <button 
                onClick={handleBookAppointment}
                className="bg-white text-rose-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 text-lg mb-4 mx-auto">
                ⏰
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Flexible Hours
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Open 7 days a week to accommodate your busy schedule
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 text-lg mb-4 mx-auto">
                💰
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Affordable Pricing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Competitive prices with package deals and membership benefits
              </p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 text-lg mb-4 mx-auto">
                🏆
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Award Winning
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Recognized for excellence in skincare and customer service
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Service;