import ReactGA from 'react-ga4';

// Google Analytics 4 Measurement ID provided by user
const GA_MEASUREMENT_ID = 'G-37YMJCWTZH';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const trackEvent = (category, action, label = null, value = null) => {
  const eventParams = {
    category,
    action,
  };
  
  if (label) eventParams.label = label;
  if (value !== null) eventParams.value = value;
  
  ReactGA.event(eventParams);
};

// Track user login
export const trackLogin = (method) => {
  ReactGA.event({
    category: 'User',
    action: 'Login',
    label: method, // 'email' or 'google'
  });
};

// Track user registration
export const trackRegistration = (method) => {
  ReactGA.event({
    category: 'User',
    action: 'Registration',
    label: method,
  });
};

// Track contact form submission
export const trackContactSubmission = () => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Contact Form Submission',
  });
};

// Track section views
export const trackSectionView = (sectionName) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Section View',
    label: sectionName,
  });
};

// Track document downloads
export const trackDownload = (documentName) => {
  ReactGA.event({
    category: 'Engagement',
    action: 'Document Download',
    label: documentName,
  });
};
