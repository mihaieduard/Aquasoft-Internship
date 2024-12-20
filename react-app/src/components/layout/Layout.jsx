// src/components/layout/Layout.jsx
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Hotel, Settings, LogOut } from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <Settings className="w-4 h-4" />,
      roles: ['*']
    },
    {
      path: '/hotels',
      label: 'Hotels',
      icon: <Hotel className="w-4 h-4" />,
      roles: ['*']
    },
    {
      path: '/hotel-manager',
      label: 'Manage Hotels',
      icon: <Hotel className="w-4 h-4" />,
      roles: ['HOTEL_MANAGER', 'GROUP_MANAGER']
    },
    {
      path: '/admin',
      label: 'Admin Panel',
      icon: <Settings className="w-4 h-4" />,
      roles: ['ADMINISTRATOR']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  Hotel Manager
                </Link>
              </div>
              
              {/* Desktop Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  (link.roles.includes('*') || link.roles.includes(user?.role)) && (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActivePath(link.path)
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* User Menu and Mobile Menu Button */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Button
                  variant="ghost"
                  className="flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="sm:hidden ml-4">
                <Button
                  variant="ghost"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navLinks.map((link) => (
                  (link.roles.includes('*') || link.roles.includes(user?.role)) && (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block pl-3 pr-4 py-2 text-base font-medium ${
                        isActivePath(link.path)
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="inline-flex items-center">
                        {link.icon}
                        <span className="ml-2">{link.label}</span>
                      </span>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;