import React from 'react';
import { GraduationCap, Award, CheckCircle, ExternalLink } from 'lucide-react';
import { education, certifications, coreCompetencies } from '../data/mock';
import { Badge } from './ui/badge';

const Qualifications = () => {
  return (
    <section
      id="qualifications"
      className="py-16 md:py-24 bg-white"
      aria-labelledby="qualifications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="qualifications-heading"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Qualifications & Certifications
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A foundation of formal education complemented by continuous professional development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Education Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="text-blue-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-slate-900 mb-1">{edu.degree}</h4>
                  <p className="text-blue-700 text-sm font-medium mb-2">{edu.specialization}</p>
                  <p className="text-slate-600 text-sm">{edu.institution}</p>
                  <p className="text-slate-500 text-sm mt-2">{edu.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="text-green-700" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">Professional Certifications</h3>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="grid gap-3">
                {certifications.slice(0, 6).map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm">{cert.name}</p>
                      <div className="flex items-center flex-wrap gap-2 mt-1">
                        <span className="text-xs text-slate-500">{cert.issuer}</span>
                        {cert.date && (
                          <Badge variant="secondary" className="text-xs">
                            {cert.date}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional certifications */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-3">Product School Certifications:</p>
                <div className="flex flex-wrap gap-2">
                  {certifications.slice(6).map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Award size={16} />
                  <span className="text-sm font-medium">100+ additional certifications</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">LinkedIn Learning, PMI, NASBA, QAI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">Core Competencies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreCompetencies.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200"
              >
                <h4 className="font-semibold text-blue-700 text-sm mb-4">{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-white px-2.5 py-1 rounded-md text-slate-700 border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Qualifications;
