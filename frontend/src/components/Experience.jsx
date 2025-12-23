import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { workExperience } from '../data/mock';

const ExperienceCard = ({ experience, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
      <button
        onClick={onToggle}
        className="w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-slate-900">{experience.title}</h3>
              {experience.type && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {experience.type}
                </span>
              )}
            </div>
            <p className="text-blue-700 font-medium mb-2">{experience.company}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {experience.location}
              </span>
              <span className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {experience.period}
              </span>
            </div>
          </div>
          <div className="ml-4 p-2 text-slate-400">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-slate-100">
          <ul className="mt-4 space-y-3">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start space-x-3 text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Experience = () => {
  const [expandedId, setExpandedId] = useState(1); // First one expanded by default

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="experience"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
          >
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            21 years of progressive leadership across product management, marketing, and sales
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true" />
          
          <div className="space-y-6">
            {workExperience.map((exp, index) => (
              <div key={exp.id} className="relative pl-8 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 top-6 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-600 border-4 border-white shadow" aria-hidden="true" />
                
                <ExperienceCard
                  experience={exp}
                  isExpanded={expandedId === exp.id}
                  onToggle={() => handleToggle(exp.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
