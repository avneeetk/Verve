
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-verve-midnight">
      <div className="glass-panel p-8 max-w-md text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-verve-teal to-verve-lilac bg-clip-text text-transparent mb-6">
          404
        </h1>
        <p className="text-xl text-verve-grey mb-6">
          This digital realm doesn't exist yet
        </p>
        <div className="inline-block">
          <Link 
            to="/" 
            className="glass-button text-verve-teal hover:text-white transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
