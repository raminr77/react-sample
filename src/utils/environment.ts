export const isDemo = process.env.NODE_ENV === 'demo';
export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const appVersion = process.env.REACT_APP_VERSION || '0.1.0';
export const appName = process.env.REACT_APP_NAME || 'REACT_SAMPLE_APP';
