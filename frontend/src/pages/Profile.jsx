import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const navigate = useNavigate();

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
  };                             //token

  useEffect(() => {
    const fetchData = async () => {
      const email = getUserEmail();     //token
      if (!email) {
        navigate("/login");
        return;
      }

      try {
        const { data: user } = await axios.get(`http://localhost:8080/api/users/${email}`);
        const { data: bookmarked } = await axios.get(`http://localhost:8080/api/bookmarks/jobs/${email}`);
        setUserData(user);
        setBookmarkedJobs(bookmarked);
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 pt-16 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16 px-4">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 bg-white shadow-xl rounded-lg p-8 relative lg:sticky lg:top-16 h-max">
          <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Your Profile</h1>
          <div className="space-y-6">
            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">Email:</strong>
              <span className="text-lg text-gray-900">{userData.email}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">Name:</strong>
              <span className="text-lg text-gray-900">{userData.name}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">Phone Number:</strong>
              <span className="text-lg text-gray-900">{userData.phoneNumber.replace(/.(?=.{4})/g, "*")}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">Gender:</strong>
              <span className="text-lg text-gray-900">{userData.gender}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">City:</strong>
              <span className="text-lg text-gray-900">{userData.city}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">State:</strong>
              <span className="text-lg text-gray-900">{userData.state}</span>
            </div>

            <div className="flex justify-between">
              <strong className="text-lg text-gray-600">Skills:</strong>
              <span className="text-lg text-gray-900">{userData.skills?.join(", ") || "No skills added"}</span>
            </div>
          </div>
        </div>

        <div className="col-span-2 bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Saved Jobs</h2>
          {bookmarkedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookmarkedJobs.map((job) => (
                <JobCard job={job} key={job.id} showDetails={true} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">You haven't bookmarked any jobs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
