import React, { useState, useEffect } from 'react';
import { X, Cookie, Check, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be changed
    targeting: false,
    advertising: false
  });

  useEffect(() => {
    // Check if user has already set cookie preferences
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing the banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, targeting: true, advertising: true };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = { essential: true, targeting: false, advertising: false };
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white border-t border-slate-200 shadow-2xl"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Cookie className="text-blue-600" size={24} />
            <h2 id="cookie-title" className="text-lg font-semibold text-slate-900">Cookie Policy</h2>
          </div>
          <button
            onClick={handleRejectAll}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close cookie banner"
          >
            <X size={20} />
          </button>
        </div>

        <p id="cookie-description" className="text-slate-600 text-sm leading-relaxed mb-4">
          We utilize cookies to tailor content and advertisements, offer social media functionalities, 
          and analyze traffic on our website. Additionally, we share details regarding your site usage 
          with our social media, advertising, and analytics associates. They may integrate this information 
          with other data you have supplied to them or that they have gathered from your utilization of their services.
        </p>

        {/* Cookie Settings Panel */}
        {showSettings && (
          <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Strictly Essential</p>
                <p className="text-xs text-slate-500">Required for basic website functionality</p>
              </div>
              <Switch
                checked={preferences.essential}
                disabled
                aria-label="Essential cookies (always enabled)"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Targeting</p>
                <p className="text-xs text-slate-500">Used to deliver relevant content</p>
              </div>
              <Switch
                checked={preferences.targeting}
                onCheckedChange={(checked) => setPreferences(p => ({ ...p, targeting: checked }))}
                aria-label="Targeting cookies"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Advertising</p>
                <p className="text-xs text-slate-500">Used to show relevant ads</p>
              </div>
              <Switch
                checked={preferences.advertising}
                onCheckedChange={(checked) => setPreferences(p => ({ ...p, advertising: checked }))}
                aria-label="Advertising cookies"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <Settings size={16} />
            <span>{showSettings ? 'Hide Settings' : 'Cookie Settings'}</span>
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="text-slate-600"
            >
              Reject All
            </Button>
            {showSettings && (
              <Button
                onClick={handleAcceptSelected}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Accept Selected
              </Button>
            )}
            <Button
              onClick={handleAcceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Check size={16} className="mr-2" />
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
