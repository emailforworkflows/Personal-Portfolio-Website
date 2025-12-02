import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Calendar, Mail } from 'lucide-react';
import { privacyPolicyContent } from '../data/mock';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-blue-600" size={32} />
            <h1 className="text-3xl font-serif font-bold text-slate-900">Privacy Policy</h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-slate-500">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>Effective Date: {privacyPolicyContent.effectiveDate}</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-2" />
              <span>{privacyPolicyContent.email}</span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-8">
              <strong>Legal Entity:</strong> {privacyPolicyContent.companyName}<br />
              <strong>Business Address:</strong> {privacyPolicyContent.businessAddress}
            </p>

            {privacyPolicyContent.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-xl font-semibold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
