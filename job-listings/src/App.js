import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch jobs from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("Fetched data:", data);  // Log the response data
        if (data && data.data && data.data.length > 0) {
          setJobs(data.data);  // Only set jobs if they exist
        } else {
          setError("No jobs found.");
        }
      })
      .catch((error) => {
        setError(error.message);  // Handle any errors
      });
  }, []);  

  return (
    <div className="App">
      <h1>Job Listings</h1>

      
      {error && <p>{error}</p>}

      
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <li key={index}>
              <h3>{job.jobTitle}</h3>
              <p><strong>Company:</strong> <a href={job.employer.companyPageUrl} target="_blank" rel="noopener noreferrer">{job.employer.companyPageUrl}</a></p>
              <p><strong>Location:</strong> {job.location.city}, {job.location.admin1Code}</p>
              <p><strong>Salary:</strong> ${job.salary.min} - ${job.salary.max} {job.salary.currency}</p>
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
              <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">Apply Here</a>
            </li>
          ))
        ) : (
          <p>No jobs available.</p>  
        )}
      </ul>
    </div>
  );
}

export default App;
