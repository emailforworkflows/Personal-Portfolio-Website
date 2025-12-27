import React from 'react';
import { useTranslation } from 'react-i18next';
import { profileData, aboutMe, education, workExperience, skills } from '../data/mock';

const PrintResume = React.forwardRef((props, ref) => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div ref={ref} className="print-resume hidden print:block bg-white text-black p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{profileData.name}</h1>
        <p className="text-lg text-blue-700 font-medium mb-2">{profileData.title}</p>
        <p className="text-sm text-gray-600 mb-3">{profileData.tagline}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span>{profileData.email}</span>
          <span>|</span>
          <span>{profileData.phone}</span>
          <span>|</span>
          <span>{profileData.location}</span>
        </div>
      </div>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
          PROFESSIONAL SUMMARY
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">{aboutMe.summary}</p>
      </section>

      {/* Key Highlights */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
          KEY HIGHLIGHTS
        </h2>
        <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
          {aboutMe.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </section>

      {/* Work Experience */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
          WORK EXPERIENCE
        </h2>
        <div className="space-y-4">
          {workExperience.slice(0, 6).map((job) => (
            <div key={job.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company} | {job.location}</p>
                </div>
                <span className="text-sm text-gray-500">{job.period}</span>
              </div>
              <ul className="mt-1 text-xs text-gray-700 list-disc list-inside space-y-0.5">
                {job.highlights.slice(0, 2).map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
          EDUCATION
        </h2>
        <div className="space-y-3">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              {edu.achievement && (
                <p className="text-xs text-blue-700 italic">{edu.achievement}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
          CORE COMPETENCIES
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {skills.slice(0, 4).map((skillGroup, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 text-xs mb-1">{skillGroup.category}</h3>
              <p className="text-xs text-gray-600">{skillGroup.skills.slice(0, 5).join(' • ')}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-8 pt-4 border-t border-gray-200">
        {t('print.generatedOn')}: {currentDate}
      </div>
    </div>
  );
});

PrintResume.displayName = 'PrintResume';

export default PrintResume;
