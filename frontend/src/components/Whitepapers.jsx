import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { whitepapers } from '../data/mock';
import { Badge } from './ui/badge';

const Whitepapers = () => {
  return (
    <section
      id="whitepapers"
      className="py-16 md:py-24 bg-slate-50"
      aria-labelledby="whitepapers-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="whitepapers-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-1"
          >
            Whitepapers
          </h2>
          <div className="w-12 h-1 bg-slate-900 mb-6"></div>
          <p className="text-slate-600 max-w-2xl">
            Technical thought leadership and product documentation developed for enterprise solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {whitepapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FileText className="text-blue-700" size={24} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {paper.company}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {paper.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {paper.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                  {paper.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6">
                <a
                  href={paper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <FileText size={16} className="mr-2" />
                  View Whitepaper
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whitepapers;
