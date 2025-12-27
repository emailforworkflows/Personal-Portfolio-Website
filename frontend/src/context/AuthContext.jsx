import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        withCredentials: true
      });
      setUser(response.data);
      setError(null);
    } catch (err) {
      setUser(null);
      // Only set error if it's not a 401 (normal unauthenticated state)
      if (err.response?.status !== 401) {
        console.error('Auth check error:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize auth check on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Login with email/password
  const login = async (email, password, rememberMe = false) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password, remember_me: rememberMe },
        { withCredentials: true }
      );
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register new user
  const register = async (email, password, name) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        { email, password, name },
        { withCredentials: true }
      );
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Process OAuth session (called from AuthCallback)
  const processOAuthSession = async (sessionId) => {
    try {
      setError(null);
      const response = await axios.post(
        `${API_URL}/api/auth/session`,
        { session_id: sessionId },
        { withCredentials: true }
      );
      setUser(response.data);
      return { success: true, user: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'OAuth authentication failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/password-reset-request`, { email });
      return { success: true, message: response.data.message, token: response.data.reset_token };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Password reset request failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Confirm password reset
  const confirmPasswordReset = async (token, newPassword) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/api/auth/password-reset-confirm`, {
        token,
        new_password: newPassword
      });
      return { success: true, message: response.data.message };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Password reset failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update user preferences
  const updatePreferences = async (preferences) => {
    try {
      setError(null);
      const response = await axios.put(
        `${API_URL}/api/auth/preferences`,
        { preferences },
        { withCredentials: true }
      );
      setUser(prev => ({ ...prev, preferences: response.data.preferences }));
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Failed to update preferences';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Google OAuth login - REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
  const loginWithGoogle = () => {
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    loginWithGoogle,
    processOAuthSession,
    requestPasswordReset,
    confirmPasswordReset,
    updatePreferences,
    checkAuth,
    clearError: () => setError(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
