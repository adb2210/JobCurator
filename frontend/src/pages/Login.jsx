import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success messages

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login",formData);
      setSuccessMessage("Login successful!");
      setIsAuthenticated(true);
      localStorage.setItem('authToken', JSON.stringify(response.data));
      navigate("/jobs");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data); // Display backend error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222831]">
      <div className="container p-6 bg-[#393E46] text-white shadow-xl rounded-lg max-w-md">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#00ADB5]">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm font-semibold">{successMessage}</p>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#00ADB5] text-white py-3 px-6 rounded-md hover:bg-[#00A8A0] transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#00ADB5] hover:underline"
          >
            Sign Up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
