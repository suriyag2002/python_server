import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch jobs from the backend API
  useEffect(() => {
    const API_URL = "https://python-server-qvsy.onrender.com/api/jobs"; // Live Render API endpoint

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the response data
        if (data && data.data && data.data.length > 0) {
          setJobs(data.data); // Only set jobs if they exist
        } else {
          setError("No jobs found.");
        }
      })
      .catch((error) => {
        setError(error.message); // Handle any errors
      });
  }, []);

  return (
    <div className="App">
      <h1>Job Listings</h1>

      {/* Show error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display job listings */}
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <li key={index} className="job-item">
              <h3>{job.jobTitle}</h3>
              <p>
                <strong>Company:</strong>{" "}
                <a
                  href={job.employer.companyPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {job.employer.companyPageUrl}
                </a>
              </p>
              <p>
                <strong>Location:</strong> {job.location.city},{" "}
                {job.location.admin1Code}
              </p>
              <p>
                <strong>Salary:</strong> ${job.salary.min} - ${job.salary.max}{" "}
                {job.salary.currency}
              </p>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              <a
                href={job.jobUrl}
                className="apply-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Here
              </a>
            </li>
          ))
        ) : (
          <p>No jobs available.</p> // Display message if no jobs are available
        )}
      </ul>
    </div>
  );
}

export default App;
