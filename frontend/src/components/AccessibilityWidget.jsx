import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Sun, Moon, Minus, Plus, X } from 'lucide-react';
import { Button } from './ui/button';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedContrast = localStorage.getItem('accessibility-high-contrast');
    
    if (savedFontSize) setFontSize(savedFontSize);
    if (savedContrast === 'true') setHighContrast(true);
  }, []);

  useEffect(() => {
    // Apply font size
    document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
    document.documentElement.classList.add(`font-size-${fontSize}`);
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  const fontSizes = ['small', 'medium', 'large', 'xlarge'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const resetSettings = () => {
    setFontSize('medium');
    setHighContrast(false);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
        aria-label="Accessibility options"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Accessibility size={24} />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          <div
            id="accessibility-panel"
            className="fixed bottom-24 right-6 z-50 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            role="dialog"
            aria-labelledby="accessibility-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center space-x-2">
                <Accessibility className="text-blue-600" size={20} />
                <h3 id="accessibility-title" className="font-semibold text-slate-900">Accessibility</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close accessibility panel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Font Size Control */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Type size={18} className="text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">Text Size</span>
                </div>
                <div className="flex items-center justify-between bg-slate-100 rounded-lg p-1">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'small'}
                    className="p-2 rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease text size"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-sm font-medium text-slate-700 capitalize">{fontSize}</span>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize === 'xlarge'}
                    className="p-2 rounded-md hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase text size"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  {highContrast ? <Moon size={18} className="text-slate-600" /> : <Sun size={18} className="text-slate-600" />}
                  <span className="text-sm font-medium text-slate-900">High Contrast</span>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                    highContrast
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300'
                  }`}
                  aria-pressed={highContrast}
                >
                  {highContrast ? 'High Contrast Enabled' : 'Enable High Contrast'}
                </button>
              </div>

              {/* Reset Button */}
              <Button
                onClick={resetSettings}
                variant="outline"
                className="w-full text-slate-600"
              >
                Reset to Default
              </Button>
            </div>

            {/* Footer Info */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <p className="text-xs text-slate-500 leading-relaxed">
                This website follows WCAG 2.1 guidelines. Use Tab key to navigate, 
                Enter to select. Screen reader support enabled.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccessibilityWidget;
