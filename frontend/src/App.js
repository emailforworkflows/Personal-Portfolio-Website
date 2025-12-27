import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// i18n
import "./i18n";

// Context
import { AuthProvider } from "./context/AuthContext";

// Analytics
import { initGA, trackPageView } from "./utils/analytics";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Qualifications from "./components/Qualifications";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import WorkSamples from "./components/WorkSamples";
import CaseStudies from "./components/CaseStudies";
import Whitepapers from "./components/Whitepapers";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";
import AccessibilityWidget from "./components/AccessibilityWidget";
import AuthCallback from "./components/AuthCallback";
import PrintResume from "./components/PrintResume";

// Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import GDPRPolicy from "./pages/GDPRPolicy";
import AccessibilityPage from "./pages/AccessibilityPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Initialize Google Analytics
initGA();

// Analytics tracker component
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

// Portfolio Home Page
const PortfolioHome = () => {
  const [activeSection, setActiveSection] = useState('about');
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Kumar_Abhinav_Resume',
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'qualifications', 'skills', 'experience', 'work-samples', 'case-studies', 'whitepapers', 'contact'];
      const scrollPosition = window.scrollY + 100;

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to main content
      </a>
      
      <Header activeSection={activeSection} onPrint={handlePrint} />
      
      <main id="main-content">
        <Hero />
        <Qualifications />
        <Skills />
        <Experience />
        <WorkSamples />
        <CaseStudies />
        <Whitepapers />
        <Contact />
      </main>
      
      <Footer />
      <CookieConsent />
      <AccessibilityWidget />
      
      {/* Print-only Resume Component */}
      <PrintResume ref={printRef} />
    </>
  );
};

// App Router component to handle session_id detection
const AppRouter = () => {
  const location = useLocation();

  // Check URL fragment for session_id SYNCHRONOUSLY (before render)
  // This prevents race conditions with OAuth callback
  if (location.hash?.includes('session_id=')) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/gdpr-policy" element={<GDPRPolicy />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AnalyticsTracker />
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
