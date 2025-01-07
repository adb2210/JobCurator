// import React, { useState, useEffect } from "react";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";

// const JobCard = ({ job }) => {
//   const [isBookmarked, setIsBookmarked] = useState(false);

//   useEffect(() => {
//     // Check if this job is already bookmarked
//     const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
//     const alreadyBookmarked = currentBookmarks.some((bookmark) => bookmark.id === job.id);
//     setIsBookmarked(alreadyBookmarked);
//   }, [job.id]);

//   const toggleBookmark = () => {
//     const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
//     let updatedBookmarks;

//     if (isBookmarked) {
//       // Remove the job from bookmarks
//       updatedBookmarks = currentBookmarks.filter((bookmark) => bookmark.id !== job.id);
//     } else {
//       // Add the job to bookmarks
//       updatedBookmarks = [...currentBookmarks, job];
//     }

//     // Update localStorage and state
//     localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
//     setIsBookmarked(!isBookmarked);
//   };

//   return (
//     <div className="bg-[#222831] text-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full relative">
//       {/* Bookmark Icon */}
//       <div
//         className="absolute top-4 right-4 text-2xl cursor-pointer text-[#00ADB5] hover:text-[#00A8A0] transition duration-300"
//         onClick={toggleBookmark}
//       >
//         {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
//       </div>

//       <div className="flex flex-col space-y-4">
//         {/* Job Title */}
//         <h2 className="text-2xl font-semibold">{job.role}</h2>

//         {/* Company Name */}
//         <p className="text-lg font-medium text-[#00ADB5]">{job.company}</p>

//         {/* Job Location */}
//         <p className="text-gray-400">{job.location?job.location:"City:NA"}</p>

//         {/* Description */}
//         <p className="text-gray-300">
//           {job.datePosted ? job.datePosted : "Date:NA"}
//         </p>
//       </div>

//       <div className="mt-6">
//         {/* Source */}
//         <div className="flex justify-between items-center">
//           <span className="text-sm text-gray-400">{job.source}</span>
//           <a
//             href={job.jobUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg hover:bg-[#00A8A0] transition duration-300"
//           >
//             Apply Now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from "axios"; // Make sure you have axios installed
import { jwtDecode } from "jwt-decode";

const JobCard = ({ job, userId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const getUserEmail = () => {
    const token = localStorage.getItem('authToken'); // Replace with your token storage key
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token); // Use jwtDecode here
      return decodedToken.sub; // Replace with the correct field from your token
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  const email = getUserEmail();
  useEffect(() => {
    //Check if this job is already bookmarked by the user
    axios
      .get(`http://localhost:8080/api/bookmarks/check/${email}/${job.id}`,{ email, jobId: job.id })
      .then((response) => {
        console.log(response.data)
        setIsBookmarked(response.data.isBookmarked); // Assuming response contains { isBookmarked: true/false }
      })
      .catch((error) => console.error("Error checking bookmark status:", error));
  }, [email, job.id]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      // Remove the job from bookmarks
      axios
        .delete(`http://localhost:8080/api/bookmarks/${email}/${job.id}`,{email, jobId: job.id })  // Use proper string interpolation here
        .then(() => {
          setIsBookmarked(false);
          updateLocalStorage(job.id,false);
        })
        .catch((error) => console.error("Error removing bookmark:", error));
    } else {
      // Add the job to bookmarks
      axios
        .post(`http://localhost:8080/api/bookmarks/${email}/${job.id}`, { email, jobId:job.id }) // Corrected string interpolation
        .then(() => {
          setIsBookmarked(true);
          updateLocalStorage(job.id,true);
        })
        .catch((error) => console.error("Error adding bookmark:", error));
    }
  };
  // Update localStorage to keep the bookmark state persistent across page refresh
  const updateLocalStorage = (jobId, isBookmarked) => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    if (isBookmarked) {
      // Add the job to the bookmarks list in localStorage
      bookmarks.push(jobId);
    } else {
      // Remove the job from the bookmarks list in localStorage
      bookmarks = bookmarks.filter((id) => id !== jobId);
    }
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
  };

  // Check if the job is bookmarked from localStorage (for page refresh)
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setIsBookmarked(bookmarks.includes(job.id));
  }, [job.id]);

  return (
    <div className="bg-[#222831] text-white rounded-lg shadow-lg p-6 flex flex-col justify-between h-full relative">
      {/* Bookmark Icon */}
      <div
        className="absolute top-4 right-4 text-2xl cursor-pointer text-[#00ADB5] hover:text-[#00A8A0] transition duration-300 z-10"
        onClick={toggleBookmark}  // Ensure this is triggering the toggleBookmark function
        style={{ zIndex: 10 }}     // Added explicit z-index to ensure the icon is clickable
      >
        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </div>

      <div className="flex flex-col space-y-4">
        {/* Job Title */}
        <h2 className="text-2xl font-semibold">{job.role}</h2>

        {/* Company Name */}
        <p className="text-lg font-medium text-[#00ADB5]">{job.company}</p>

        {/* Job Location */}
        <p className="text-gray-400">{job.location ? job.location : "City:NA"}</p>

        {/* Description */}
        <p className="text-gray-300">{job.datePosted ? job.datePosted : "Date:NA"}</p>
      </div>

      <div className="mt-6">
        {/* Source */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">{job.source}</span>
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00ADB5] text-white px-4 py-2 rounded-lg hover:bg-[#00A8A0] transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

