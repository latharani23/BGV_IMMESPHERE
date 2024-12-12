import React, { useState, useEffect } from "react";

const Step4 = () => {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/formData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setFormData(data); // Store data in state
      } catch (error) {
        setError('Failed to load form data');
        console.error(error); // Log error for debugging
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  // Define handleSubmit function
  const handleSubmit = () => {
    if (formData) {
      // Simple validation: Check if all required fields are present
      if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields.');
        return;
      }
      alert('Form submitted successfully!');
    } else {
      alert('Please review the data before submitting.');
    }
  };

  if (error) {
    return <div>{error}</div>; // Handle error if data couldn't be fetched
  }

  if (!formData) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className="step-container">
      <h3>Step 4: Review and Submit</h3>

      <div className="review-section">
        <h4>Review Your Information</h4>

        {/* Review information from previous steps */}
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Resume:</strong> {formData.resumeFileName}</p>
        <p><strong>Terms Agreement:</strong> {formData.termsAgreement ? 'Yes' : 'No'}</p>
        <p><strong>Relative working at Immensphere:</strong> {formData.relativeWorking ? 'Yes' : 'No'}</p>
        <p><strong>Form Completion:</strong> {formData.formCompletion ? 'Yes' : 'No'}</p>
        <p><strong>Gender:</strong> {formData.gender}</p>
        <p><strong>Position:</strong> {formData.position}</p>
      </div>

      <button onClick={handleSubmit}>Submit Form</button>
    </div>
  );
};

export default Step4;
