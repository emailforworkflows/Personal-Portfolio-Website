import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Accessibility, Keyboard, Eye, Volume2, MousePointer } from 'lucide-react';

const AccessibilityPage = () => {
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
            <Accessibility className="text-blue-600" size={32} />
            <h1 className="text-3xl font-serif font-bold text-slate-900">Accessibility Statement</h1>
          </div>

          {/* Banner Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-800 leading-relaxed">
              Our website is designed to provide equal access and usability for all users, including those 
              with disabilities. We follow best practices to meet WCAG 2.1 standards, including keyboard 
              navigation, screen reader support, and sufficient color contrast. If you experience any 
              accessibility barriers, please contact us.
            </p>
          </div>

          <div className="space-y-8">
            {/* Keyboard Navigation */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Keyboard className="text-slate-700" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Keyboard Navigation</h2>
              </div>
              <p className="text-slate-600 mb-3">
                All interactive elements on this website can be accessed using keyboard navigation:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Tab:</strong> Move forward through interactive elements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Shift + Tab:</strong> Move backward through interactive elements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Enter/Space:</strong> Activate buttons and links</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Escape:</strong> Close modals and dialogs</span>
                </li>
              </ul>
            </section>

            {/* Screen Reader Support */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Volume2 className="text-slate-700" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Screen Reader Support</h2>
              </div>
              <p className="text-slate-600">
                This website uses semantic HTML and ARIA labels to ensure compatibility with screen readers 
                such as NVDA, JAWS, VoiceOver, and TalkBack. All images have descriptive alt text, and 
                form fields are properly labeled.
              </p>
            </section>

            {/* Visual Accessibility */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Eye className="text-slate-700" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Visual Accessibility</h2>
              </div>
              <p className="text-slate-600 mb-3">
                We provide several features to improve visual accessibility:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Adjustable font sizes:</strong> Use the accessibility widget to increase or decrease text size</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>High contrast mode:</strong> Enable high contrast for improved readability</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>Color contrast:</strong> All text meets WCAG 2.1 AA contrast requirements</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                  <span><strong>No motion sensitivity:</strong> Respects prefers-reduced-motion settings</span>
                </li>
              </ul>
            </section>

            {/* Interactive Elements */}
            <section>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <MousePointer className="text-slate-700" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">Interactive Elements</h2>
              </div>
              <p className="text-slate-600">
                All buttons, links, and form elements have visible focus indicators. Interactive elements 
                are sized appropriately for touch targets (minimum 44x44 pixels) and have sufficient 
                spacing to prevent accidental activation.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-slate-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-3">Report an Issue</h2>
              <p className="text-slate-600 mb-4">
                If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li><strong>Email:</strong> <a href="mailto:kumarforpm@outlook.com" className="text-blue-600 hover:underline">kumarforpm@outlook.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+919873966405" className="text-blue-600 hover:underline">+91 9873966405</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessibilityPage;
