
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center bg-dermiq-cream">
        <div className="text-center max-w-md p-8">
          <h1 className="text-6xl font-bold text-dermiq-maroon mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="mb-8 text-gray-700">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button className="bg-dermiq-maroon hover:bg-dermiq-maroon/90 text-white">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
