import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Sienna Miller',
    role: 'Founder & CEO',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Sienna_Miller_Premiere_of_The_Lost_City_of_Z_at_Zoo_Palast_Berlinale_2017_04_%28cropped%29.jpg',
    description: 'Passionate about natural skincare for over 10 years'
  },
  {
    id: 2,
    name: 'Wednesday Addams',
    role: 'Head Chemist',
    image: 'https://variety.com/wp-content/uploads/2024/02/GettyImages-1851273250-e1722957713756.jpg?w=1000&h=667&crop=1',
    description: 'Expert in organic formulations and sustainable practices'
  },
  {
    id: 3,
    name: 'Musk Zuckerberg',
    role: 'Product Development',
    image: 'https://media.wired.com/photos/6862cb0455100d2a2bbf7a4b/1:1/w_2560%2Cc_limit/Zuck-Welcomes-Superintelligence-Team-Business-2170596573.jpg',
    description: 'Dedicated to creating effective, gentle skincare solutions'
  },
  {
    id: 4,
    name: 'Elon Musk',
    role: 'Sustainability Lead',
    image: 'https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg',
    description: 'Ensuring our products and packaging are eco-friendly'
  }
];

const brandValues = [
  {
    id: 1,
    title: 'Natural',
    description: 'We use only the purest natural ingredients sourced from ethical suppliers.',
    icon: '🌿',
    color: 'from-green-400 to-emerald-600'
  },
  {
    id: 2,
    title: 'Sustainable',
    description: 'Our packaging is 100% recyclable and we follow eco-friendly manufacturing processes.',
    icon: '🌎',
    color: 'from-blue-400 to-cyan-600'
  },
  {
    id: 3,
    title: 'Quality',
    description: 'Every product undergoes rigorous testing to ensure the highest quality standards.',
    icon: '⭐',
    color: 'from-amber-400 to-orange-600'
  },
  {
    id: 4,
    title: 'Transparent',
    description: 'We believe in complete transparency about our ingredients and processes.',
    icon: '🔍',
    color: 'from-purple-400 to-indigo-600'
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

const AboutUs = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const handleTeamMemberClick = (memberName) => {
    window.scrollTo(0, 0);
    console.log(`Clicked on ${memberName}`);
  };

  const handleValueClick = (valueTitle) => {
    window.scrollTo(0, 0);
    console.log(`Clicked on value: ${valueTitle}`);
  };

  return (
    <div id="aboutus" className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-cream-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-rose-200/30 via-amber-200/30 to-rose-200/30 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 px-4"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-800 dark:text-white mb-4 tracking-tight">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-2xl mx-auto">
            Crafting natural skincare with love and purpose
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-serif font-light text-gray-800 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2018, our journey began with a simple belief: skincare should be pure, 
                  effective, and kind to both your skin and the planet. What started as a small kitchen 
                  experiment has grown into a brand trusted by thousands.
                </p>
                <p>
                  Our founder, Sarah Chen, struggled with sensitive skin for years. Frustrated with 
                  products filled with harsh chemicals, she turned to nature's remedies. Through 
                  extensive research and collaboration with dermatologists, we developed formulas 
                  that harness the power of natural ingredients without compromising on results.
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  Today, we continue to innovate while staying true to our core values of purity, 
                  sustainability, and transparency.
                </p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                  alt="Our skincare laboratory"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-200 dark:bg-rose-800 rounded-full opacity-50"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-200 dark:bg-amber-800 rounded-full opacity-50"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white/50 dark:bg-gray-800/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-light text-gray-800 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {brandValues.map((value) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                onClick={() => handleValueClick(value.title)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer hover:scale-105"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center text-2xl mb-4`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-light text-gray-800 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate people behind our products
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                onClick={() => handleTeamMemberClick(member.name)}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-rose-600 dark:text-rose-400 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-rose-100 to-amber-100 dark:from-gray-800 dark:to-gray-700 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-800 dark:text-white mb-6">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
            "To create effective, natural skincare solutions that nurture your skin while respecting 
            our planet, empowering everyone to feel confident in their natural beauty."
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutUs;