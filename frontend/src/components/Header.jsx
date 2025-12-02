import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Mail, Phone } from 'lucide-react';
import { profileData } from '../data/mock';

const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About Me' },
    { id: 'qualifications', label: 'Qualifications & Certifications' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'contact', label: 'Contact Me' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-white'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Name */}
          <button
            onClick={() => scrollToSection('about')}
            className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
            aria-label="Go to top"
          >
            <span className="text-lg md:text-xl font-semibold text-slate-900">
              {profileData.name}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={profileData.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Send Email"
            >
              <Mail size={20} />
            </a>
            <a
              href={`tel:${profileData.phone}`}
              className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label="Call Phone"
            >
              <Phone size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="lg:hidden py-4 border-t border-slate-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 pt-4 mt-4 border-t border-slate-200">
              <a
                href={profileData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-500 hover:text-blue-700 rounded-lg"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-2 text-slate-500 hover:text-blue-700 rounded-lg"
                aria-label="Send Email"
              >
                <Mail size={24} />
              </a>
              <a
                href={`tel:${profileData.phone}`}
                className="p-2 text-slate-500 hover:text-blue-700 rounded-lg"
                aria-label="Call Phone"
              >
                <Phone size={24} />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
