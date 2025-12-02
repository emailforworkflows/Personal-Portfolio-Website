import React from 'react';
import { TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import { caseStudies } from '../data/mock';

const CaseStudyCard = ({ study }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header with Letter and Year */}
      <div className="flex items-start p-6 pb-4">
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold text-slate-700 mr-4 flex-shrink-0"
          style={{ backgroundColor: study.color }}
        >
          {study.letter}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm text-slate-500 mb-1">
            <Calendar size={14} className="mr-1" />
            {study.year}
          </div>
          <h3 className="text-lg font-semibold text-slate-900 leading-tight">
            {study.title}
          </h3>
          <p className="text-blue-600 text-sm font-medium mt-1">{study.client}</p>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 pb-4">
        <p className="text-slate-600 text-sm leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {study.tags.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {study.tags.length > 5 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
              +{study.tags.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Impact */}
      <div className="px-6 pb-6">
        <div className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
          <TrendingUp size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800 leading-relaxed">{study.impact}</p>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="case-studies-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-1"
          >
            Featured Projects
          </h2>
          <div className="w-12 h-1 bg-slate-900 mb-6"></div>
          <p className="text-slate-600 max-w-2xl">
            Transformational products that delivered measurable impact across healthcare, technology, and enterprise sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
