import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Building2 } from 'lucide-react';
import { Button } from './ui/button';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/alumni');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-50 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${
          isScrolled ? 'h-12' : 'h-16'
        }`}>
          {/* Logo */}
          <Link to="/alumni" className="flex items-center space-x-3 group">
            <div className="relative">
              <GraduationCap className={`text-blue-600 group-hover:text-blue-500 ${
                isScrolled ? 'h-6 w-6' : 'h-8 w-8'
              }`} />
              <Building2 className={`text-gray-400 absolute -top-1 -right-1 ${
                isScrolled ? 'h-2 w-2' : 'h-3 w-3'
              }`} />
            </div>
            <div>
              <span className={`font-bold text-gray-900 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>
                NEXUS
              </span>
              <div className={`text-gray-500 -mt-1 ${
                isScrolled ? 'text-xs hidden' : 'text-xs'
              }`}>Alumni Network</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-1">
            <Link 
              to="/alumni" 
              className={`rounded-lg ${
                isScrolled ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
              } ${
                isActive('/alumni') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Alumni Directory
            </Link>
            <Link 
              to="/jobs" 
              className={`rounded-lg ${
                isScrolled ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
              } ${
                isActive('/jobs') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Job Board
            </Link>
            <Link 
              to="/events" 
              className={`rounded-lg ${
                isScrolled ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
              } ${
                isActive('/events') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Events
            </Link>
            <Link 
              to="/campaigns" 
              className={`rounded-lg ${
                isScrolled ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'
              } ${
                isActive('/campaigns') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Campaigns
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <Button 
                onClick={handleLogout} 
                className={`bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 ${
                  isScrolled ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'
                }`}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button className={`bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 ${
                    isScrolled ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'
                  }`}>
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className={`bg-blue-600 hover:bg-blue-700 text-white border-0 ${
                    isScrolled ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1.5'
                  }`}>
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;