import React from "react";
import HeaderSection from "../components/HeaderSection";
import CategoryPreview from "../components/CategoryPreview";
import ProductList from "../components/ProductList";
import ContactForm from "../components/ContactForm";
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className="relative overflow-hidden">
    
      <main className='relative'>
        <HeaderSection />
        <CategoryPreview />
        <ProductList />
        <ContactForm />
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
