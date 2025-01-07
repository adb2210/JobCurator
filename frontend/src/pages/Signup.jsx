import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const skillsOptions = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "SQL",
  "CSS",
  "HTML",
  "AWS",
  "Appium",
  "Ansible",
  "Azure",
  "AutoCAD",
  "Backend",
  "Bash",
  "Big Data",
  "Cassandra",
  "Goggle Cloud",
  "Docker",
  "Django",
  "Git",
  "Jira",
  "Kubernetes",
  "Node.js",
  "OAuth",
  "Selenium",
  "TensorFlow",
  "Terraform",
  "Wireshark",
  "JUnit"
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    state: "",
    city: "",
    skills: [],
     // Set role to "user" by default
  });

  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillSelect = (skill) => {
    if (!formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  try {
    const response=await axios.post("http://localhost:8080/api/auth/signup",formData);
    alert("Signup successful!");
    navigate("/login");

  } catch (error) {
    alert(error.response.data);
  }
   
  };
  

  return (
    <div className="min-h-screen bg-[#222831] flex items-center justify-center pt-16 mt-[20px]">
      {/* Container for the form */}
      <div className="container mx-auto p-6 bg-[#393E46] text-white shadow-xl rounded-lg max-w-xl">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#00ADB5]">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold">
               Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-semibold">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              pattern="[0-9]{10}"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold">
              Skills <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.skills.join(", ")}
                readOnly
                className="w-full p-3 bg-[#222831] text-white border border-[#00ADB5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5] cursor-pointer"
                placeholder="Select Skills"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <ul className="absolute z-10 w-full bg-[#393E46] border border-[#00ADB5] rounded-md mt-1 max-h-40 overflow-auto">
                  {skillsOptions.map((skill) => (
                    <li
                      key={skill}
                      className="p-2 hover:bg-[#00ADB5] cursor-pointer"
                      onClick={() => handleSkillSelect(skill)}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Selected Skills */}
            <div className="flex items-center flex-wrap mt-2 gap-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-[#00ADB5] text-[#222831] px-3 py-1 rounded-full flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="ml-2 text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#00ADB5] text-white py-3 px-6 rounded-md hover:bg-[#00A8A0] transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#00ADB5] hover:underline"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
