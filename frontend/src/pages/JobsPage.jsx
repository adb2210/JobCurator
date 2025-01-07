import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const JobsPage = () => {
  const getUserEmail = () => {    //token
      const token = localStorage.getItem("authToken");
      if (!token) return null;
  
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    };  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("forYou");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCompany, setSearchCompany] = useState(""); 
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);

  //Check if the user is logged in and retrieve the email
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken = jwtDecode(token);
        setUserEmail(decodedToken.email);
      } catch (err) {
        console.error("Error decoding token:", err);
        navigate("/login");
      }
    } else {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [navigate]);

  // Fetch all jobs from the API once on component mount
  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/jobs/all");
        if (response.status === 200) {
          setAllJobs(response.data);
          setFilteredJobs(response.data); // Initially, set filtered jobs to all jobs
        } else {
          setError(`Error: ${response.statusText}`);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Network error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (allJobs.length === 0) {
      fetchAllJobs();
    }
  }, [allJobs]);

  // Automatically filter jobs based on search inputs
  // useEffect(() => {
  //   const filtered = allJobs.filter(
  //     (job) =>
  //       (job.role && job.role.toLowerCase().includes(searchTitle.toLowerCase())) &&
  //       (job.company && job.company.toLowerCase().includes(searchCompany.toLowerCase())) &&
  //       (job.location && job.location.toLowerCase().includes(searchLocation.toLowerCase()))
  //   );
  //   setFilteredJobs(filtered); // Update filtered jobs
  //   setActiveTab("search"); // Switch to search tab when filtering
  // }, [searchTitle, searchCompany, searchLocation, allJobs]);
  useEffect(() => {
    const filteredAllJobs = allJobs.filter(
      (job) =>
        (job.role && job.role.toLowerCase().includes(searchTitle.toLowerCase())) &&
        (job.company && job.company.toLowerCase().includes(searchCompany.toLowerCase())) &&
        (job.location && job.location.toLowerCase().includes(searchLocation.toLowerCase()))
    );
    setFilteredJobs(filteredAllJobs); // Update filtered jobs for all jobs tab
  }, [searchTitle, searchCompany, searchLocation, allJobs]);
  

  // Fetch recommended jobs based on the logged-in user's email
  const fetchRecommendedJobs = useCallback(async () => {
    const userEmail = getUserEmail();
    if (!userEmail) return;
    setLoading(true);
    try {
      const allJobsResponse = await axios.get("http://localhost:8080/api/jobs/all");
      const recommendedResponse = await axios.get(
        `http://localhost:8080/api/jobs/recommended/${userEmail}`
      );
  
      if (allJobsResponse.status === 200 && recommendedResponse.status === 200) {
        const allJobsData = allJobsResponse.data;
        const recommendedData = recommendedResponse.data;
  
        // Match recommended job titles with allJobs roles
        const matchedJobs = allJobsData.filter((job) =>
          recommendedData.some((recJob) => {
            // Split both role and jobTitle into arrays of words
            const jobWords = job.role.trim().toLowerCase().split(/\s+/); // Split by any whitespace
            const recJobWords = recJob.jobTitle.trim().toLowerCase().split(/\s+/)[0]; // Split by any whitespace
  
            // Check if there is any common word between jobWords and recJobWords
            return jobWords.some((word) => recJobWords.includes(word));
          })
        );
        setMatchedJobs(matchedJobs); // Set matched jobs
      }
    } catch (err) {
      console.error("Error fetching recommended jobs:", err);
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [userEmail]);
  
  // Automatically filter matched jobs based on search inputs
  useEffect(() => {
    const filteredMatchedJobs = matchedJobs.filter(
      (job) =>
        (job.role && job.role.toLowerCase().includes(searchTitle.toLowerCase())) &&
        (job.company && job.company.toLowerCase().includes(searchCompany.toLowerCase())) &&
        (job.location && job.location.toLowerCase().includes(searchLocation.toLowerCase()))
    );
    setRecommendedJobs(filteredMatchedJobs); // Update filtered matched jobs for "For You" tab
  }, [searchTitle, searchCompany, searchLocation, matchedJobs]);

  // Fetch recommended jobs when activeTab is "forYou"
  useEffect(() => {
    if (activeTab === "forYou") {
      fetchRecommendedJobs();
    }
  }, [activeTab, fetchRecommendedJobs]);

  if (!isLoggedIn) return null;

  return (
    <div className="p-6 pt-24 max-w-5xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Find your perfect job"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full sm:w-2/3 focus:ring-2 focus:ring-[#00ADB5]"
        />
        <input
          type="text"
          placeholder="Company"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-[#00ADB5]"
        />
        <input
          type="text"
          placeholder="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full sm:w-1/3 focus:ring-2 focus:ring-[#00ADB5]"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-10 border-b mb-6">
        <button
          className={`pb-2 text-lg font-semibold ${activeTab === "forYou" ? "border-b-4 border-[#00ADB5] text-[#00ADB5]" : "text-gray-600"}`}
          onClick={() => setActiveTab("forYou")}
        >
          For you
        </button>
        <button
          className={`pb-2 text-lg font-semibold ${activeTab === "search" ? "border-b-4 border-[#00ADB5] text-[#00ADB5]" : "text-gray-600"}`}
          onClick={() => setActiveTab("search")}
        >
          Search
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "forYou" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#00ADB5]">Recommended Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedJobs.length > 0 ? (
              recommendedJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-500">No recommended jobs found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "search" && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#00ADB5]">All Jobs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p>Loading jobs...</p>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-500">No jobs found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
