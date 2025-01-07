import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated (check localStorage for user info)
    const loggedInUser = localStorage.getItem('authToken');
    setIsAuthenticated(!!loggedInUser); // Set the state based on the presence of loggedInUser
  }, []);

  const handleExploreJobs = () => {
    if (isAuthenticated) {
      // If the user is authenticated, navigate to the jobs page
      navigate('/jobs');
    } else {
      // If not authenticated, redirect to the login page
      navigate('/login');
    }
  };

  return (
    <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501594907355-b5587d4604b4')" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#222831] to-[#00ADB5] opacity-80">
        <div className="flex justify-center items-center w-full h-full text-center text-white">
          <div className="animate__animated animate__fadeIn">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 animate__delay-1s animate__fadeInUp">
              Welcome to JobCurator
            </h1>
            <p className="text-lg sm:text-xl mb-6 animate__fadeInUp animate__delay-2s">
              Discover the best job opportunities and jump-start your career.
            </p>
            <div className="space-x-4 animate__fadeInUp animate__delay-3s">
              <button
                onClick={handleExploreJobs}
                className="bg-[#00ADB5] text-white py-3 px-8 rounded-lg hover:bg-[#00A8A0] transition duration-300"
              >
                Explore Jobs
              </button>
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="bg-transparent border-2 border-[#00ADB5] text-[#00ADB5] py-3 px-8 rounded-lg hover:bg-[#00A8A0] hover:text-white transition duration-300"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-transparent border-2 border-[#00ADB5] text-[#00ADB5] py-3 px-8 rounded-lg hover:bg-[#00A8A0] hover:text-white transition duration-300"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
