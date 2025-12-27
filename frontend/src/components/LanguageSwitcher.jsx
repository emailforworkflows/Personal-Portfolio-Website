import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' }
];

const LanguageSwitcher = ({ compact = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 rounded-lg transition-colors ${
          compact
            ? 'p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600'
            : 'px-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe size={compact ? 14 : 16} />
        {!compact && (
          <span className="text-xs font-medium">{currentLang.code.toUpperCase()}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-slate-50 ${
                currentLang.code === lang.code ? 'text-blue-600 bg-blue-50' : 'text-slate-700'
              }`}
            >
              <span>
                {lang.nativeName}
                <span className="text-slate-400 ml-1">({lang.name})</span>
              </span>
              {currentLang.code === lang.code && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
