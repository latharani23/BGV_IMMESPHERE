import React, { useState } from "react";

const Step2 = () => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!resume) {
      setError('Please upload your resume.');
    } else {
      setError('');
      alert('Resume submitted successfully!');
    }
  };

  return (
    <div className="form-container">
      <h3>Upload Resume</h3>
      <input
        type="file"
        onChange={handleFileChange}
        className="form-field"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step2;
