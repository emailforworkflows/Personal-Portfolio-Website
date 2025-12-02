import React from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { caseStudies } from '../data/mock';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

const CaseStudyCard = ({ study }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-xs">
            {study.category}
          </Badge>
          <span className="text-sm text-slate-500">{study.company}</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
          {study.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="px-6 py-4 bg-slate-50">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Technologies</p>
        <div className="flex flex-wrap gap-2">
          {study.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-white text-slate-700 text-xs rounded-md border border-slate-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div className="px-6 py-4">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Key Outcomes</p>
        <ul className="space-y-2">
          {study.outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <a
          href={study.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <FileText size={16} className="mr-2" />
          View Document
          <ExternalLink size={14} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="py-16 md:py-24 bg-slate-50"
      aria-labelledby="case-studies-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="case-studies-heading"
            className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4"
          >
            Case Studies
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Whitepapers and UX design work showcasing problem-solving and thought leadership
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
