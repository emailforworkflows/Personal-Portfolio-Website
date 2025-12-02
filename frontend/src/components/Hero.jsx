import React from 'react';
import { MapPin, Mail, Phone, Linkedin, Download, ChevronDown } from 'lucide-react';
import { profileData, keyAchievements } from '../data/mock';
import { Button } from './ui/button';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start pt-8 md:pt-12">
          {/* Profile Image & Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img
                    src={profileData.photo}
                    alt={`${profileData.name} - Professional Headshot`}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">20+</span>
                  </div>
                </div>
                
                <h1 id="hero-heading" className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  {profileData.name}
                </h1>
                <p className="text-blue-700 font-semibold mb-1">{profileData.title}</p>
                <p className="text-slate-600 text-sm mb-6">{profileData.subtitle}</p>
                
                <div className="flex items-center text-slate-500 text-sm mb-6">
                  <MapPin size={16} className="mr-2" />
                  <span>{profileData.location}</span>
                </div>
                
                {/* Contact Quick Links */}
                <div className="w-full space-y-3">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg transition-colors text-sm"
                  >
                    <Mail size={18} />
                    <span className="truncate">{profileData.email}</span>
                  </a>
                  <a
                    href={`tel:${profileData.phone}`}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 rounded-lg transition-colors text-sm"
                  >
                    <Phone size={18} />
                    <span>{profileData.phone}</span>
                  </a>
                  <a
                    href={profileData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Linkedin size={18} />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Executive Summary */}
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-3">
                Executive Summary
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                {profileData.summary}
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { value: '€50M+', label: 'Business Impact' },
                { value: '20+', label: 'Years Experience' },
                { value: '70+', label: 'Global Locations' },
                { value: '500K+', label: 'Users Served' }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-slate-100 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Key Achievements */}
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-4">
                Key Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {keyAchievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
                  >
                    <h3 className="font-semibold text-slate-900 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base"
              >
                Get In Touch
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-base"
                onClick={() => document.getElementById('case-studies').scrollIntoView({ behavior: 'smooth' })}
              >
                View Case Studies
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => document.getElementById('qualifications').scrollIntoView({ behavior: 'smooth' })}
            className="p-2 text-slate-400 hover:text-blue-600 transition-colors animate-bounce"
            aria-label="Scroll to qualifications"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
