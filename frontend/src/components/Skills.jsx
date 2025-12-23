import React from 'react';
import { Rocket, BarChart3, Users, Target, MessageSquare } from 'lucide-react';
import { skills } from '../data/mock';

const getIcon = (iconName) => {
  const iconProps = { size: 24, className: "text-blue-700" };
  switch (iconName) {
    case 'rocket': return <Rocket {...iconProps} />;
    case 'chart': return <BarChart3 {...iconProps} />;
    case 'users': return <Users {...iconProps} />;
    case 'target': return <Target {...iconProps} />;
    case 'message': return <MessageSquare {...iconProps} />;
    default: return <Target {...iconProps} />;
  }
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-slate-50"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="skills-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-1"
          >
            Skills
          </h2>
          <div className="w-12 h-1 bg-slate-900 mb-6"></div>
          <p className="text-slate-600 max-w-2xl">
            Core competencies developed over 20+ years of product management and go-to-market leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {getIcon(category.icon)}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm leading-tight">
                  {category.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
