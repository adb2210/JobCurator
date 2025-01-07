// import React, { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
//   const navigate = useNavigate();
//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")); // Retrieve logged-in user object

//   useEffect(() => {
//     // Check if there's a logged-in user and update the state
//     const loggedInUser = localStorage.getItem("loggedInUser");
//     setIsAuthenticated(!!loggedInUser); // Set to true if logged-in user exists
//   }, [setIsAuthenticated]);

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); // Remove user data from localStorage
//     setIsAuthenticated(false); // Update state to reflect logged-out status
//     navigate("/login"); // Redirect to login page
//   };

//   const handleJobsClick = () => {
//     if (isAuthenticated) {
//       navigate("/jobs"); // Navigate to the jobs page if authenticated
//     } else {
//       alert("Please Login First"); // Alert and redirect to login page if not authenticated
//       navigate("/login");
//     }
//   };

//   const handleProfile= () => {
//     if (isAuthenticated) {
//       navigate("/profile"); // Navigate to Admin Panel if user is admin
//     } else {
//       alert("You need to log in as an admin to access the Admin Panel.");
//       navigate("/login"); // Redirect to login page if not an admin or not authenticated
//     }
//   };

//   return (
//     <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg">
//       <div className="flex justify-between items-center">
//         <div className="text-2xl font-bold">
//           <Link to="/" className="hover:bg-gray-700 p-2 rounded">
//             JobCurator
//           </Link>
//         </div>
//         <div className="space-x-6 flex items-center ml-4">
//           <button onClick={handleJobsClick} className="hover:bg-gray-700 p-2 rounded">
//             Jobs
//           </button>
//           {!isAuthenticated && (
//             <>
//               <Link to="/signup" className="hover:bg-gray-700 p-2 rounded">
//                 Sign Up
//               </Link>
//               <Link to="/login" className="hover:bg-gray-700 p-2 rounded">
//                 Login
//               </Link>
//             </>
//           )}
//           {isAuthenticated && (
//             <>
//               <button onclick={handleProfile} className="hover:bg-gray-700 p-2 rounded">
//                 Profile
//               </button>
//               <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded hover:bg-red-700">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's an auth token to update authentication state
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken); // Update authentication status based on token presence
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove auth token from localStorage
    setIsAuthenticated(false); // Update state to reflect logged-out status
    navigate("/login"); // Redirect to login page
  };

  const handleJobsClick = () => {
    if (isAuthenticated) {
      navigate("/jobs"); // Navigate to jobs page if authenticated
    } else {
      alert("Please login first!"); // Alert the user and redirect to login if unauthenticated
      navigate("/login");
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile"); // Navigate to the profile page if authenticated
    } else {
      alert("Please login to access your profile."); // Alert and redirect to login if unauthenticated
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:bg-gray-700 p-2 rounded">
            JobCurator
          </Link>
        </div>
        {/* Navigation Links */}
        <div className="space-x-6 flex items-center ml-4">
          <button onClick={handleJobsClick} className="hover:bg-gray-700 p-2 rounded">
            Jobs
          </button>
          {!isAuthenticated ? (
            // Show Signup and Login buttons for unauthenticated users
            <>
              <Link to="/signup" className="hover:bg-gray-700 p-2 rounded">
                Sign Up
              </Link>
              <Link to="/login" className="hover:bg-gray-700 p-2 rounded">
                Login
              </Link>
            </>
          ) : (
            // Show Profile and Logout buttons for authenticated users
            <>
              <button onClick={handleProfileClick} className="hover:bg-gray-700 p-2 rounded">
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

