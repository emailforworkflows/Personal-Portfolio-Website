import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Settings, LogOut, Shield, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, loading, logout, checkAuth } = useAuth();

  // Check auth on mount if no user passed from state
  useEffect(() => {
    if (!location.state?.user && !user && !loading) {
      checkAuth();
    }
  }, [location.state, user, loading, checkAuth]);

  // Redirect to login if not authenticated after loading
  useEffect(() => {
    if (!loading && !isAuthenticated && !location.state?.user) {
      navigate('/login', { replace: true });
    }
  }, [loading, isAuthenticated, navigate, location.state]);

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  // Use user from state (passed from AuthCallback) or from context
  const currentUser = location.state?.user || user;

  // Show loading while checking auth
  if (loading && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ArrowLeft size={18} />
              <span>Back to Portfolio</span>
            </Link>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-slate-600 hover:text-red-600"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-6">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-blue-100">
                    <span className="text-4xl font-bold text-white">
                      {currentUser.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {isAdmin && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                      <Shield size={12} />
                      Admin
                    </span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {currentUser.name}
              </h2>
              <p className="text-slate-600 mb-6">{currentUser.email}</p>

              {/* Profile Details */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="text-blue-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-700">{currentUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <User className="text-blue-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-500">Auth Provider</p>
                    <p className="text-sm font-medium text-slate-700 capitalize">
                      {currentUser.auth_provider || 'Email'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Calendar className="text-blue-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-500">Member Since</p>
                    <p className="text-sm font-medium text-slate-700">
                      {currentUser.created_at
                        ? new Date(currentUser.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Settings size={20} className="text-blue-600" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/">
                  <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
                    <User size={20} className="text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium">View Portfolio</p>
                      <p className="text-xs text-slate-500">Browse the main site</p>
                    </div>
                  </Button>
                </Link>
                
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="w-full h-auto py-4 justify-start gap-3">
                      <Shield size={20} className="text-amber-600" />
                      <div className="text-left">
                        <p className="font-medium">Admin Panel</p>
                        <p className="text-xs text-slate-500">Manage contacts & users</p>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Welcome to Your Dashboard!</h3>
              <p className="text-blue-100 mb-6">
                Thank you for creating an account. As a registered user, you can save your
                preferences and access personalized features.
              </p>
              <div className="flex flex-wrap gap-3">
                {!isAdmin && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-sm">
                    <User size={16} />
                    Visitor Account
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
