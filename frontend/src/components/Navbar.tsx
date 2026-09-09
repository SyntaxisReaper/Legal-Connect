import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-1' : 'bg-white shadow-sm py-2'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-primary-600">
              <Scale size={28} />
              <span className="text-xl font-bold text-secondary-900">LegalConnect</span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/lawyers" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors relative group">
                Find Lawyers
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/practice-areas" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors relative group">
                Practice Areas
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="text-secondary-600 hover:text-primary-600 font-medium flex items-center transition-transform hover:scale-105">
                  <User size={18} className="mr-1" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 font-medium transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-secondary-600 hover:text-primary-600 font-medium transition-colors">Log in</Link>
                <Link to="/register" className="bg-primary-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">Get Started</Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-secondary-600 hover:text-primary-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/lawyers" className="block px-3 py-2 text-secondary-600 font-medium hover:bg-gray-50 rounded-md">Find Lawyers</Link>
            <Link to="/practice-areas" className="block px-3 py-2 text-secondary-600 font-medium hover:bg-gray-50 rounded-md">Practice Areas</Link>
            {user ? (
              <>
                <Link to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} className="block px-3 py-2 text-secondary-600 font-medium hover:bg-gray-50 rounded-md">Dashboard</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-500 font-medium hover:bg-gray-50 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-secondary-600 font-medium hover:bg-gray-50 rounded-md">Log in</Link>
                <Link to="/register" className="block px-3 py-2 text-primary-600 font-medium hover:bg-gray-50 rounded-md">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
