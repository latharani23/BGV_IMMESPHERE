import React, { useState } from "react";
import axios from "axios";

const Step2 = () => {
  const [resume, setResume] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate file type (example: only accept PDF or DOCX)
    if (file && !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setError('Please upload a valid resume (PDF or DOCX).');
      setResume(null); // Reset file
    } else if (file && file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
      setError('File size exceeds 5MB. Please upload a smaller file.');
      setResume(null); // Reset file
    } else {
      setError('');
      setResume(file);
    }
  };

  const handleSubmit = async () => {
    if (!resume) {
      setError('Please upload your resume.');
      return;
    }

    setError('');
    setLoading(true);

    // Create FormData to send file in POST request
    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      setUploadedFileName(response.data.file); // Update state with uploaded file name
      alert('Resume submitted successfully!');
    } catch (error) {
      // Handle error response
      console.log(error);
      setError('Error uploading resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Inline styles
  const containerStyle = {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    maxWidth: '700px',
    margin: '300px auto', // Center the container
    minHeight: '350px', // Increase the minimum height of the container

    textAlign: 'left', // Align text to the left
  };

  const buttonStyle = {
    backgroundColor:'#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px', // Adjusted font size for better appearance
    cursor: 'pointer',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    width: '30%', // Make button full width
  };

  return (
    <div style={containerStyle}>
      <h3>Upload Resume</h3><br></br>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: '10px', width: '100%' }} // Full width
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        style={loading ? { ...buttonStyle, backgroundColor: 'lightgray' } : buttonStyle}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      <br /><br />
      {/* Display the uploaded file name */}
      {uploadedFileName && (
        <div>
          <h4>Uploaded File:</h4><br></br>
          <p>{uploadedFileName}</p>
        </div>
      )}
    </div>
  );
};

export default Step2;