import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, MapPin, Shield, Accessibility } from 'lucide-react';
import { profileData } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2">{profileData.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{profileData.title}</p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Product management executive with 20+ years delivering end-to-end software and hardware products
              across global markets with €50M+ business impact.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {[
                  { id: 'about', label: 'About Me' },
                  { id: 'qualifications', label: 'Qualifications' },
                  { id: 'experience', label: 'Experience' },
                  { id: 'work-samples', label: 'Work Samples' },
                  { id: 'case-studies', label: 'Case Studies' },
                  { id: 'whitepapers', label: 'Whitepapers' },
                  { id: 'contact', label: 'Contact' }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${profileData.email}`}
                  className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Mail size={14} className="mr-2" />
                  {profileData.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profileData.phone}`}
                  className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Phone size={14} className="mr-2" />
                  {profileData.phone}
                </a>
              </li>
              <li>
                <a
                  href={profileData.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Linkedin size={14} className="mr-2" />
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center text-slate-400 text-sm">
                <MapPin size={14} className="mr-2" />
                {profileData.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} {profileData.name}. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy-policy"
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Shield size={14} className="mr-1" />
                Privacy Policy
              </Link>
              <Link
                to="/accessibility"
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Accessibility size={14} className="mr-1" />
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
