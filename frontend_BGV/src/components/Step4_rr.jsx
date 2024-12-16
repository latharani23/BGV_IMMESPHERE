import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Step4 = () => {
  const [formData, setFormData] = useState(null); // Initializing formData as null to check loading state
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/getUpdatedData')
      .then((response) => {
        console.log('Fetched Data:', response.data);  // Debugging step to check API response
        setFormData(response.data);  // Update formData with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);  // Set error state if fetch fails
      });
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Define handleSubmit function
  const handleSubmit = () => {
    if (!formData) {
      alert('No data available to submit.');
      return;
    }

    // Simple validation: Check if all required fields are present
    if (!formData.name || !formData.email || !formData.PhoneNumber) {
      alert('Please fill in all required fields.');
      return;
    }

    // Submit data to the server (Example POST request)
    axios.post('http://localhost:5000/submitForm', formData)
      .then((response) => {
        alert('Form submitted successfully!');
        console.log('Submit Response:', response.data);
      })
      .catch((error) => {
        alert('Error submitting the form.');
        console.error('Submit Error:', error);
      });
  };

  // Handle error state
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button> {/* Retry button to reload data */}
      </div>
    );
  }

  // Handle loading state
  if (formData === null && !error) {
    return <div>Loading...</div>;  // Show a loading indicator while fetching data
  }

  // Render the component
  return (
    <div className="step-container">
      <h3>Step 4: Review and Submit</h3>

      <div className="review-section">
        <h4>Review Your Information</h4>

        {/* Display the reviewed information */}
        <p><strong>Name:</strong> {formData?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {formData?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {formData?.PhoneNumber || 'N/A'}</p>
        <p><strong>Current Address:</strong> {formData?.CurrentAddress || 'N/A'}</p>
        <p><strong>Permanent Address:</strong> {formData?.PermanentAddress || 'N/A'}</p>
        <p><strong>University Graduated:</strong> {formData?.UniversityGraduated || 'N/A'}</p>
        <p><strong>Field Of Study:</strong> {formData?.FieldOfStudy || 'N/A'}</p>
        <p><strong>Passed Out Year:</strong> {formData?.PassedOutYear || 'N/A'}</p>
        <p><strong>CGPA:</strong> {formData?.CGPA || 'N/A'}</p>
        <p><strong>Organization Name:</strong> {formData?.organizationName || 'N/A'}</p>
        <p><strong>Years of Experience:</strong> {formData?.yearsOfExperience || 'N/A'}</p>
        <p><strong>Company Location:</strong> {formData?.companyLocation || 'N/A'}</p>
        <p><strong>Pan Number:</strong> {formData?.panNumber || 'N/A'}</p>

        {/* Add any other fields you need */}
        <p><strong>Gender:</strong> {formData?.gender || 'N/A'}</p>
        <p><strong>Terms Agreement:</strong> {formData?.termsAgreement ? 'Yes' : 'No'}</p>
        <p><strong>Relative working at Immensphere:</strong> {formData?.relativeWorking ? 'Yes' : 'No'}</p>
        <p><strong>Form Completion:</strong> {formData?.formCompletion ? 'Yes' : 'No'}</p>

        {/* Example of displaying the resume if available */}
        <p>
          <strong>Resume:</strong>{' '}
          {formData?.resumeFileName ? (
            <a
              href={`http://localhost:5000/uploads/${formData.resumeFileName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formData.resumeFileName} (Download)
            </a>
          ) : (
            'No resume uploaded'
          )}
        </p>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default Step4;
