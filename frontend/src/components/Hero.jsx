import React from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Phone, Linkedin, TrendingUp, Award, Globe, Users } from 'lucide-react';
import { profileData, aboutMe } from '../data/mock';
import { Button } from './ui/button';

const Hero = () => {
  const { t } = useTranslation();
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-slate-50 to-white"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Photo and Basic Info */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mb-12">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src={profileData.photo}
              alt={`${profileData.name} - Professional Headshot`}
              className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg border-4 border-white"
            />
          </div>
          
          {/* Name and Title */}
          <div className="flex-1">
            <h1 id="hero-heading" className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {profileData.name}
            </h1>
            <p className="text-xl text-blue-700 font-semibold mb-2">{t('hero.title')}</p>
            <p className="text-slate-600 mb-4">{t('hero.subtitle')}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
              <span className="flex items-center">
                <MapPin size={16} className="mr-1" />
                {t('hero.location')}
              </span>
              <a href={`mailto:${profileData.email}`} className="flex items-center hover:text-blue-600">
                <Mail size={16} className="mr-1" />
                {profileData.email}
              </a>
              <a href={`tel:${profileData.phone}`} className="flex items-center hover:text-blue-600">
                <Phone size={16} className="mr-1" />
                {profileData.phone}
              </a>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={scrollToContact} className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('hero.contactMe')}
              </Button>
              <a
                href={profileData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Linkedin size={18} className="mr-2" />
                {t('hero.linkedIn')}
              </a>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">{t('about.title')}</h2>
          <div className="w-12 h-1 bg-slate-900 mb-6"></div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              {aboutMe.summary}
            </p>
            
            {/* What Drives Me */}
            <div className="border-l-4 border-orange-400 bg-orange-50 p-5 rounded-r-lg mb-6">
              <h3 className="font-bold text-slate-900 mb-2">{t('about.whatDrivesMe')}</h3>
              <p className="text-slate-700 italic">
                {aboutMe.whatDrivesMe}
              </p>
            </div>
            
            <p className="text-slate-700 leading-relaxed">
              {aboutMe.globalPerspective}
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {aboutMe.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                {index === 0 && <Award className="text-blue-700" size={20} />}
                {index === 1 && <TrendingUp className="text-blue-700" size={20} />}
                {index === 2 && <Award className="text-blue-700" size={20} />}
                {index === 3 && <Globe className="text-blue-700" size={20} />}
              </div>
              <p className="text-slate-700 text-sm">{highlight}</p>
            </div>
          ))}
        </div>

        {/* Born & Background */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-blue-600 font-medium mb-1">Born</p>
            <p className="text-lg font-semibold text-slate-900">{profileData.born}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-blue-600 font-medium mb-1">Background</p>
            <p className="text-lg font-semibold text-slate-900">{profileData.background}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
