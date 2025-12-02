import React, { useState } from 'react';
import { GraduationCap, Award, ExternalLink } from 'lucide-react';
import { education, certificationCategories, certifications } from '../data/mock';

// Issuer logos
const IssuerLogo = ({ issuer }) => {
  if (issuer === 'Google') {
    return (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
    );
  }
  if (issuer === 'IBM') {
    return (
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#1F70C1" d="M0 7.5h4.5v1H0zm0 2h4.5v1H0zm0 2h4.5v1H0zm0 2h4.5v1H0zm0 2h4.5v1H0zm6 0h3v1h-3zm0-2h4.5v1H6zm0-2h4.5v1H6zm0-2h3v1h-3zm0-2h3v1h-3zm6 8h3v1h-3zm0-2h4.5v1H12zm0-2h4.5v1H12zm0-2h3v1h-3zm0-2h3v1h-3zm6 8h6v1h-6zm0-2h4.5v1H18zm0-2h4.5v1H18zm0-2h6v1h-6zm0-2h6v1h-6z"/>
      </svg>
    );
  }
  return (
    <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
  );
};

const Qualifications = () => {
  const [activeTab, setActiveTab] = useState('product-management');

  return (
    <section
      id="qualifications"
      className="py-16 md:py-24 bg-slate-50"
      aria-labelledby="qualifications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            id="qualifications-heading"
            className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
          >
            Certifications & Education
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Continuous learning across product management, AI, project leadership, and cybersecurity domains.
          </p>
          
          {/* LinkedIn Badge */}
          <div className="mt-6 inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
            <Award className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">100+ LinkedIn Certifications</span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {certificationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === category.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
              aria-selected={activeTab === category.id}
              role="tab"
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Certifications Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-slate-900">
              {certificationCategories.find(c => c.id === activeTab)?.label}
            </h3>
          </div>

          <div className="space-y-3">
            {certifications[activeTab]?.map((cert, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                  cert.isHeader 
                    ? 'bg-transparent' 
                    : 'bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {!cert.isHeader && <IssuerLogo issuer={cert.issuer} />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-slate-800 ${cert.isHeader ? 'font-medium' : ''}`}>
                      {cert.isHeader ? cert.name : `${cert.name}${cert.id ? ` (ID: ${cert.id})` : ''} - ${cert.issuer}${cert.date ? ` (${cert.date})` : ''}`}
                    </p>
                  </div>
                </div>
                {cert.hasLink && !cert.isHeader && (
                  <button
                    className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    <ExternalLink size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                  <GraduationCap className="text-blue-700" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{edu.degree}</h4>
                  <p className="text-blue-700 text-sm font-medium mb-2">{edu.specialization}</p>
                  <p className="text-slate-600 text-sm">{edu.institution}</p>
                  <p className="text-slate-500 text-sm mt-2">{edu.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
