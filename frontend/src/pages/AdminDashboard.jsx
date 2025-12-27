import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Users,
  Trash2,
  CheckCircle,
  Circle,
  Loader2,
  Shield,
  UserCog,
  RefreshCw,
  LogOut
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/dashboard', { replace: true });
    }
  }, [authLoading, user, isAdmin, navigate]);

  const fetchContacts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/contacts`, {
        withCredentials: true
      });
      setContacts(response.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to load contacts');
      }
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users`, {
        withCredentials: true
      });
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      Promise.all([fetchContacts(), fetchUsers()]).finally(() => setLoading(false));
    }
  }, [isAdmin, fetchContacts, fetchUsers]);

  const handleMarkAsRead = async (contactId, currentStatus) => {
    try {
      await axios.put(
        `${API_URL}/api/admin/contacts/${contactId}`,
        { read: !currentStatus },
        { withCredentials: true }
      );
      setContacts(prev =>
        prev.map(c => (c.id === contactId ? { ...c, read: !currentStatus } : c))
      );
    } catch (err) {
      console.error('Error updating contact:', err);
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await axios.delete(`${API_URL}/api/admin/contacts/${contactId}`, {
        withCredentials: true
      });
      setContacts(prev => prev.filter(c => c.id !== contactId));
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const handleToggleRole = async (userId) => {
    if (!window.confirm('Are you sure you want to change this user\'s role?')) return;
    try {
      const response = await axios.put(
        `${API_URL}/api/admin/users/${userId}/role`,
        {},
        { withCredentials: true }
      );
      setUsers(prev =>
        prev.map(u => (u.user_id === userId ? { ...u, role: response.data.new_role } : u))
      );
    } catch (err) {
      console.error('Error updating user role:', err);
      alert(err.response?.data?.detail || 'Failed to update role');
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    Promise.all([fetchContacts(), fetchUsers()]).finally(() => setLoading(false));
  };

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  if (authLoading || (loading && isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const unreadCount = contacts.filter(c => !c.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-slate-200"></div>
              <div className="flex items-center gap-2">
                <Shield className="text-amber-600" size={20} />
                <span className="font-semibold text-slate-900">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-slate-600 hover:text-red-600">
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Messages</p>
                <p className="text-2xl font-bold text-slate-900">{contacts.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Mail className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Unread</p>
                <p className="text-2xl font-bold text-slate-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="text-2xl font-bold text-slate-900">{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-xl shadow">
          <TabsList className="w-full justify-start border-b rounded-none p-0">
            <TabsTrigger
              value="contacts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-4"
            >
              <MessageSquare size={18} className="mr-2" />
              Contact Messages
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-4"
            >
              <Users size={18} className="mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="p-6">
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="mx-auto text-slate-300" size={48} />
                <p className="mt-4 text-slate-500">No contact messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map(contact => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg border ${
                      contact.read
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-slate-900">{contact.name}</span>
                          <span className="text-sm text-slate-500">{contact.email}</span>
                          {contact.phone && (
                            <span className="text-sm text-slate-500">• {contact.phone}</span>
                          )}
                        </div>
                        {contact.subject && (
                          <p className="text-sm font-medium text-slate-700 mb-1">
                            Subject: {contact.subject}
                          </p>
                        )}
                        <p className="text-slate-600">{contact.message}</p>
                        <p className="text-xs text-slate-400 mt-2">
                          {new Date(contact.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(contact.id, contact.read)}
                          title={contact.read ? 'Mark as unread' : 'Mark as read'}
                        >
                          {contact.read ? (
                            <CheckCircle className="text-green-600" size={18} />
                          ) : (
                            <Circle className="text-slate-400" size={18} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="p-6">
            {users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto text-slate-300" size={48} />
                <p className="mt-4 text-slate-500">No users registered yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">User</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Provider</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Joined</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.user_id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {u.picture ? (
                              <img
                                src={u.picture}
                                alt={u.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-600">
                                  {u.name?.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <span className="font-medium text-slate-900">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className="capitalize text-slate-600">
                            {u.auth_provider || 'email'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              u.role === 'admin'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {u.role === 'admin' && <Shield size={12} />}
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">
                          {u.created_at
                            ? new Date(u.created_at).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {u.user_id !== user?.user_id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleRole(u.user_id)}
                              title="Toggle admin role"
                            >
                              <UserCog size={18} className="text-slate-600" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
