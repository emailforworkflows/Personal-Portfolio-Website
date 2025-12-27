import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Linkedin, Mail, Phone, Minus, Plus, Sun, Moon, User, LogIn, Printer } from 'lucide-react';
import { profileData } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = ({ activeSection, onPrint }) => {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('accessibility-font-size') || 'medium';
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-high-contrast') === 'true';
  });

  const navItems = [
    { id: 'about', label: t('nav.aboutMe') },
    { id: 'qualifications', label: t('nav.qualifications') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'experience', label: t('nav.workExperience') },
    { id: 'work-samples', label: t('nav.workSamples') },
    { id: 'case-studies', label: t('nav.caseStudies') },
    { id: 'whitepapers', label: t('nav.whitepapers') },
    { id: 'contact', label: t('nav.contactMe') }
  ];

  const fontSizes = ['small', 'medium', 'large', 'xlarge'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
    document.documentElement.classList.add(`font-size-${fontSize}`);
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

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
            <span className="text-base md:text-lg font-semibold text-slate-900">
              {profileData.name}
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Side - Accessibility + Auth + Social */}
          <div className="hidden xl:flex items-center space-x-2">
            {/* Accessibility Controls */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 mr-2">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'small'}
                className="p-1.5 rounded hover:bg-white disabled:opacity-40 transition-colors"
                aria-label="Decrease font size"
              >
                <Minus size={14} />
              </button>
              <span className="px-2 text-xs font-medium text-slate-600">A</span>
              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'xlarge'}
                className="p-1.5 rounded hover:bg-white disabled:opacity-40 transition-colors"
                aria-label="Increase font size"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-1.5 rounded-lg transition-colors ${
                highContrast ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
            >
              {highContrast ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-xs font-medium text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className="hidden 2xl:inline">{user?.name?.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            )}

            {/* Social Links */}
            <div className="flex items-center space-x-1 ml-2">
              <a
                href={profileData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Send Email"
              >
                <Mail size={16} />
              </a>
              <a
                href={`tel:${profileData.phone}`}
                className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Call Phone"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
            className="xl:hidden py-4 border-t border-slate-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Mobile Auth Button */}
            <div className="pb-4 mb-4 border-b border-slate-200">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-blue-50 rounded-lg"
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-xs text-slate-500">View Dashboard</p>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mx-4 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Accessibility Controls */}
            <div className="flex items-center justify-center gap-4 pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center bg-slate-100 rounded-lg p-1">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'small'}
                  className="p-2 rounded hover:bg-white disabled:opacity-40"
                  aria-label="Decrease font size"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 text-sm font-medium text-slate-600">A</span>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  className="p-2 rounded hover:bg-white disabled:opacity-40"
                  aria-label="Increase font size"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`p-2 rounded-lg transition-colors ${
                  highContrast ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
                aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
              >
                {highContrast ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>

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
