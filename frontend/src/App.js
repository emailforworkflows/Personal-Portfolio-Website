import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Qualifications from "./components/Qualifications";
import Experience from "./components/Experience";
import WorkSamples from "./components/WorkSamples";
import CaseStudies from "./components/CaseStudies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import AccessibilityWidget from "./components/AccessibilityWidget";

// Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AccessibilityPage from "./pages/AccessibilityPage";

// Portfolio Home Page
const PortfolioHome = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'qualifications', 'experience', 'work-samples', 'case-studies', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a href="#about" className="skip-link">
        Skip to main content
      </a>
      
      <Header activeSection={activeSection} />
      
      <main id="main-content">
        <Hero />
        <Qualifications />
        <Experience />
        <WorkSamples />
        <CaseStudies />
        <Contact />
      </main>
      
      <Footer />
      <CookieConsent />
      <AccessibilityWidget />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
