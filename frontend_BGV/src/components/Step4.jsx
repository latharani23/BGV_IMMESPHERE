import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Step4.css';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon


const Step4 = () => {
  const [formData, setFormData] = useState(null);  // Form data from /get-user-form
  const [updatedData, setUpdatedData] = useState(null);  // Data from /getUpdatedData
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message



  useEffect(() => {
    // Using Promise.all to fetch both endpoints in parallel
    Promise.all([
      axios.get('http://localhost:5000/getUpdatedData'),
      axios.get('http://localhost:5000/get-user-form')
    ])
      .then(([updatedResponse, formResponse]) => {
        console.log('Fetched Updated Data:', updatedResponse.data);
        console.log('Fetched Form Data:', formResponse.data);
  
        setUpdatedData(updatedResponse.data);  // Set the data for updated information
        
        // Check if formResponse.data is an array and set the first element
        if (Array.isArray(formResponse.data) && formResponse.data.length > 0) {
          setFormData(formResponse.data[0]);  // Set the first object in the array
        } else {
          setFormData(null); // Handle case where no data is returned
        }
  
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);  // Set error state if fetch fails
        setLoading(false); // Stop loading on error
      });
  }, []);  // Empty dependency array ensures this runs only once on mount
  

  // Handle error state
  if (error) {
    return <div className="error">Error: {error}</div>;  // Display error message
  }

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;  // Show a loading indicator while fetching data
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  


  // Handle form submission and navigate to Submit.js
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    console.log("Submitting form...");
     // Simulate a successful form submission (this can be replaced with your actual API call)
     setSuccessMessage('User data successfully submitted!');  // Set the success message
    
    
  };
  
  // Render the component
  return (
    <div className="step-container">
      <h3>Step 4: Review and Submit</h3>
      <form onSubmit={handleSubmit}>
      <FaEdit className="edit-icon" onClick={toggleEdit} /> {/* Edit icon in the top right corner */}

      <div className="review-section">
        <h4>Review Your Information</h4>
        <div className="updated-section">
          <p><strong>Name:</strong> {isEditing ? <input type="text" value={updatedData?.name} onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })} /> : updatedData?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {isEditing ? <input type="email" value={updatedData?.email} onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} /> : updatedData?.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {isEditing ? <input type="text" value={updatedData?.PhoneNumber} onChange={(e) => setUpdatedData({ ...updatedData, PhoneNumber: e.target.value })} /> : updatedData?.PhoneNumber || 'N/A'}</p>
          <p><strong>Current Address:</strong> {isEditing ? <input type="text" value={updatedData?.CurrentAddress} onChange={(e) => setUpdatedData({ ...updatedData, CurrentAddress: e.target.value })} /> : updatedData?.CurrentAddress || 'N/A'}</p>
         {/* <p><strong>Permanent Address:</strong> {isEditing ? <input type="text" value={updatedData?.PermanentAddress} onChange={(e) => setUpdatedData({ ...updatedData, PermanentAddress: e.target.value })} /> : updatedData?.PermanentAddress || 'N/A'}</p>*/}
          <p><strong>University Graduated:</strong> {isEditing ? <input type="text" value={updatedData?.UniversityGraduated} onChange={(e) => setUpdatedData({ ...updatedData, UniversityGraduated: e.target.value })} /> : updatedData?.UniversityGraduated || 'N/A'}</p>
          <p><strong>Field Of Study:</strong> {isEditing ? <input type="text" value={updatedData?.FieldOfStudy} onChange={(e) => setUpdatedData({ ...updatedData, FieldOfStudy: e.target.value })} /> : updatedData?.FieldOfStudy || 'N/A'}</p>
          <p><strong>Passed Out Year:</strong> {isEditing ? <input type="text" value={updatedData?.PassedOutYear} onChange={(e) => setUpdatedData({ ...updatedData, PassedOutYear: e.target.value })} /> : updatedData?.PassedOutYear || 'N/A'}</p>
          <p><strong>University Location:</strong> {isEditing ? <input type="text" value={updatedData?.UniversityLocation} onChange={(e) => setUpdatedData({ ...updatedData, UniversityLocation: e.target.value })} /> : updatedData?.UniversityLocation || 'N/A'}</p>
          <p><strong>CGPA:</strong> {isEditing ? <input type="text" value={updatedData?.CGPA} onChange={(e) => setUpdatedData({ ...updatedData, CGPA: e.target.value })} /> : updatedData?.CGPA || 'N/A'}</p>
         { /*<p><strong>Position:</strong> {isEditing ? <input type="text" value={updatedData?.Position} onChange={(e) => setUpdatedData({ ...updatedData, Position: e.target.value })} /> : updatedData?.Position || 'N/A'}</p>*/}
          <p><strong>Organization Name:</strong> {isEditing ? <input type="text" value={updatedData?.organizationName} onChange={(e) => setUpdatedData({ ...updatedData, organizationName: e.target.value })} /> : updatedData?.organizationName || 'N/A'}</p>
          <p><strong>Years of Experience:</strong> {isEditing ? <input type="text" value={updatedData?.yearsOfExperience} onChange={(e) => setUpdatedData({ ...updatedData, yearsOfExperience: e.target.value })} /> : updatedData?.yearsOfExperience || 'N/A'}</p>
          <p><strong>Company Location:</strong> {isEditing ? <input type="text" value={updatedData?.companyLocation} onChange={(e) => setUpdatedData({ ...updatedData, companyLocation: e.target.value })} /> : updatedData?.companyLocation || 'N/A'}</p>
          <p><strong>Pan Number:</strong> {isEditing ? <input type="text" value={updatedData?.panNumber} onChange={(e) => setUpdatedData({ ...updatedData, panNumber: e.target.value })} /> : updatedData?.panNumber || 'N/A'}</p>
        </div>
        
        {/* Additional information from formData */}
        <h4>Additional Information</h4>
        <p><strong>Gender:</strong> {isEditing ? <input type="text" value={formData?.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> : formData?.gender || 'N/A'}</p>
        <p><strong>Terms Agreement:</strong> {isEditing ? <input type="checkbox" checked={formData?.termsAgreement} onChange={(e) => setFormData({ ...formData, termsAgreement: e.target.checked })} /> : formData?.termsAgreement ? 'Yes' : 'No'}</p>
        <p><strong>Relative Working at Immensphere:</strong> {isEditing ? <input type="checkbox" checked={formData?.relativeWorking} onChange={(e) => setFormData({ ...formData, relativeWorking: e.target.checked })} /> : formData?.relativeWorking ? 'Yes' : 'No'}</p>
        <p><strong>Form Completion:</strong> {isEditing ? <input type="checkbox" checked={formData?.formCompletion} onChange={(e) => setFormData({ ...formData, formCompletion: e.target.checked })} /> : formData?.formCompletion ? 'Yes' : 'No'}</p>
        <p><strong>Checkbox 1:</strong> {isEditing ? <input type="checkbox" checked={formData?.checkboxValues?.[0]} onChange={(e) => setFormData({ ...formData, checkboxValues: [e.target.checked, formData?.checkboxValues?.[1]] })} /> : formData?.checkboxValues?.[0] ? 'Yes' : 'No'}</p>
        <p><strong>Checkbox 2:</strong> {isEditing ? <input type="checkbox" checked={formData?.checkboxValues?.[1]} onChange={(e) => setFormData({ ...formData, checkboxValues: [formData?.checkboxValues?.[0], e.target.checked] })} /> : formData?.checkboxValues?.[1] ? 'Yes' : 'No'}</p>

      </div>

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit Form</button>
    </form>
    {/* Display the success message after submission */}
    {successMessage && <div className="success-message">{successMessage}</div>}
  
    </div>
  );
};

export default Step4;