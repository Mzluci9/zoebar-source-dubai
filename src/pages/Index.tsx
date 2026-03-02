import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PartnerSection from "@/components/PartnerSection";
import About from "@/components/About";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const handleSlideChange = useCallback((index: number) => setActiveSlide(index), []);

  return (
    <>
      <Navbar />
      <Hero onSlideChange={handleSlideChange} />
      {activeSlide === 0 && <PartnerSection />}
      <About />
      <Products />
      <Footer />
    </>
  );
};

export default Index;
