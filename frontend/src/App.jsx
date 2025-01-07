// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Profile from "./pages/Profile";
// import JobsPage from "./pages/JobsPage";
// import LandingPage from "./pages/LandingPage";
// import AdminPage from "./pages/admin";

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('authToken'));
//     if (loggedInUser) {
//       setIsAuthenticated(true);
//       setUserRole(loggedInUser.role); // Directly use the role from loggedInUser
//     } else {
//       setIsAuthenticated(false);
//       setUserRole(null);
//     }
//   }, []);
//   return (
//     <Router>
//       <Navbar
//         isAuthenticated={isAuthenticated}
//         setIsAuthenticated={setIsAuthenticated}
//         userRole={userRole}
//       />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/jobs" element={<JobsPage />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
//         <Route
//           path="/profile"
//           element={
//             isAuthenticated ? (
//               <Profile />
//             ) : (
//               <Navigate to="/login" replace />
//              )
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             isAuthenticated && userRole === "admin" ? (
//               <AdminPage />
//             ) : (
//               <Navigate to="/signup" replace />
//             )
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import JobsPage from "./pages/JobsPage";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/admin";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error accessing authToken:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Loading complete
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder during loading
  }

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <AdminPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
