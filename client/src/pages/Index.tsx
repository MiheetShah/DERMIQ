
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  useEffect(() => {
    // This is just to enable the redirect to work properly
    console.log('Index page loaded, redirecting to landing page');
  }, []);

  return <Navigate to="/" replace />;
};

export default Index;
