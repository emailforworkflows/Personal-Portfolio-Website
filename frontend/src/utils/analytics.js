import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-37YMJCWTZH';

export const initGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    testMode: process.env.NODE_ENV === 'development'
  });
};

export const trackPageView = (path, title) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title: title || document.title
  });
};

export const trackEvent = (eventName, eventData = {}) => {
  ReactGA.event({
    action: eventName,
    category: eventData.category || 'engagement',
    label: eventData.label,
    value: eventData.value
  });
};

export const trackConversion = (conversionType, value = 1) => {
  ReactGA.event({
    action: conversionType,
    category: 'conversion',
    value: value
  });
};

export const setUserProperties = (userId, properties = {}) => {
  ReactGA.set({
    userId: userId,
    ...properties
  });
};
