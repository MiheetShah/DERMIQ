
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-dermiq-maroon text-white py-3 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          DermIQ
        </Link>
        
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-dermiq-beige transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-dermiq-beige transition-colors">
            About
          </Link>
          {user ? (
            <>
              <Link to="/analyze" className="hover:text-dermiq-beige transition-colors">
                Analyze
              </Link>
              <Link to="/results" className="hover:text-dermiq-beige transition-colors">
                Results
              </Link>
              <button 
                onClick={logout}
                className="hover:text-dermiq-beige transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-dermiq-beige transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="hover:text-dermiq-beige transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
