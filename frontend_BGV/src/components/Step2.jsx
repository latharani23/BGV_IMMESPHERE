import React, { useState } from "react";
import axios from "axios";
import "./Step2.css"; 



const Step2 = () => {
  const [resume, setResume] = useState(null);
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
      alert('Resume submitted successfully!');
    } catch (error) {
      // Handle error response
      console.log(error)
      setError('Error uploading resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-container">
      <h3>Upload Resume</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="form-field"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button1 onClick={handleSubmit} disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button1>
    </div>
  );
};

export default Step2;
