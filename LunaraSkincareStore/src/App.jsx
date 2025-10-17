import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Product from './pages/Product'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs';
import Service from './pages/Service'
import Footer from './components/Footer';
import BodyCare from './pages/BodyCare';
import SpecialProducts from './pages/SpecialProducts';
import SkincareRoutine from './pages/SkincareRoutine';
import TreatmentAndCare from './pages/TreatmentAndCare';
import Cart from './pages/Cart';
import CustomerInfo from './pages/CustomerInfo';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/product" element={<Product />} />
          <Route path="/service" element={<Service/>} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/customer-info" element={<CustomerInfo />} />

          <Route path="/product/bodycare" element={<BodyCare />} />
          <Route path="/product/specialproducts" element={<SpecialProducts />} />
          <Route path="/product/skincareroutine" element={<SkincareRoutine />} />
          <Route path="/product/treatmentandcare" element={<TreatmentAndCare />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;

