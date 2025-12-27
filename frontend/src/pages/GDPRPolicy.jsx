import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';

const GDPRPolicy = () => {
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
            <h1 className="text-3xl font-bold text-slate-900">GDPR Compliance Policy</h1>
          </div>

          <div className="text-sm text-slate-500 mb-8">
            <p>Effective Date: July 1, 2025</p>
            <p>Last Updated: July 1, 2025</p>
          </div>

          {/* Introduction */}
          <div className="mb-10">
            <p className="text-slate-700 leading-relaxed mb-4">
              Kumar Abhinav ("we," "us," or "our") is committed to protecting your personal data and respecting your privacy rights under the General Data Protection Regulation (GDPR). This policy explains how we collect, use, store, and protect your personal information in compliance with EU data protection laws.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                <strong>Data Controller:</strong> Kumar Abhinav<br />
                <strong>Address:</strong> Delhi, India<br />
                <strong>Contact:</strong> kumarforpm@outlook.com
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
              Legal Basis for Processing
            </h2>
            <p className="text-slate-600 mb-4">We process your personal data based on the following legal grounds:</p>
            <ul className="space-y-3">
              {[
                { title: "Consent", desc: "When you voluntarily submit information through our contact form" },
                { title: "Legitimate Interest", desc: "To respond to inquiries and improve our services" },
                { title: "Legal Obligation", desc: "When required to comply with applicable laws" }
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <span className="font-medium text-slate-900">{item.title}:</span>
                    <span className="text-slate-600 ml-1">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
              Data We Collect
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-medium text-slate-900 mb-2">Personal Data</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Name</li>
                  <li>• Email address</li>
                  <li>• Phone number (optional)</li>
                  <li>• Message content</li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-medium text-slate-900 mb-2">Technical Data</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• IP address</li>
                  <li>• Browser type and version</li>
                  <li>• Device information</li>
                  <li>• Cookie preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
              Your Rights Under GDPR
            </h2>
            <p className="text-slate-600 mb-4">As an EU resident, you have the following rights:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Right of Access", desc: "Request a copy of your personal data" },
                { title: "Right to Rectification", desc: "Request correction of inaccurate data" },
                { title: "Right to Erasure", desc: "Request deletion of your personal data" },
                { title: "Right to Restrict Processing", desc: "Limit how we use your data" },
                { title: "Right to Data Portability", desc: "Receive your data in a portable format" },
                { title: "Right to Object", desc: "Object to processing based on legitimate interest" },
                { title: "Right to Withdraw Consent", desc: "Withdraw consent at any time" },
                { title: "Right to Lodge a Complaint", desc: "File a complaint with a supervisory authority" }
              ].map((right, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{right.title}</p>
                    <p className="text-slate-600 text-xs">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">4</span>
              Data Retention
            </h2>
            <p className="text-slate-600 mb-4">We retain your personal data only for as long as necessary:</p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Contact form submissions:</strong> Retained for 2 years unless you request earlier deletion</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Cookie preferences:</strong> Stored locally on your device</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Technical logs:</strong> Automatically deleted after 30 days</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">5</span>
              Data Security
            </h2>
            <p className="text-slate-600 mb-4">We implement appropriate technical and organizational measures to protect your data:</p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>SSL/TLS encryption for all data transmissions</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Secure database storage with access controls</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                <span>Regular security assessments and updates</span>
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">6</span>
              International Data Transfers
            </h2>
            <p className="text-slate-600">
              Your data may be processed outside the European Economic Area (EEA). When this occurs, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission, to protect your data in accordance with GDPR requirements.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold mr-3">7</span>
              Cookies
            </h2>
            <p className="text-slate-600 mb-4">
              Our website uses cookies to enhance your browsing experience. You can manage your cookie preferences through our cookie consent banner. We categorize cookies as:
            </p>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Strictly Essential:</strong> Required for website functionality (cannot be disabled)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Targeting:</strong> Used to deliver relevant content</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <span><strong>Advertising:</strong> Used to show relevant advertisements</span>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Exercise Your Rights</h2>
            <p className="text-slate-600 mb-4">
              To exercise any of your GDPR rights or if you have questions about this policy, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:kumarforpm@outlook.com"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Mail size={18} className="mr-2" />
                kumarforpm@outlook.com
              </a>
              <a
                href="tel:+919873966405"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Phone size={18} className="mr-2" />
                +91 9873966405
              </a>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              We will respond to your request within 30 days as required by GDPR.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GDPRPolicy;
