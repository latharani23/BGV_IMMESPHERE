import React, { useState } from "react";
import axios from "axios";

const Step3 = () => {
  // State for form fields
  const [termsAgreement, setTermsAgreement] = useState(false); // Default to false
  const [relativeWorking, setRelativeWorking] = useState(""); // Default to an empty string
  const [formCompletion, setFormCompletion] = useState(""); // Default to an empty string
  const [gender, setGender] = useState(""); // Default to an empty string
  const [checkboxValues, setCheckboxValues] = useState([false, false]); // Default to unchecked checkboxes
  const [error, setError] = useState(null); // To store any error messages

  const handleCheckboxChange = (index) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!termsAgreement) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    if (!gender) {
      setError("Please select a gender.");
      return;
    }

    // Form data model (without the 'position' field)
    const formDataModel = {
      termsAgreement,
      relativeWorking,
      formCompletion,
      gender,
      checkboxValues,
    };

    console.log("Sending data:", formDataModel); // Debug log

    try {
      const response = await axios.post("http://localhost:5000/submit-user-form", formDataModel);
      console.log("Form data saved:", response.data);
      alert(response.data.message); // Show success message to user
      setError(null); // Clear error on successful submission
    } catch (error) {
      // Handle Axios error
      if (error.response) {
        console.error("Error from server:", error.response.data); // Log server error
        setError(`Server Error: ${error.response.data.message}`); // Set error message
      } else {
        console.error("Axios error:", error.message); // Log Axios error
        setError(`Network Error: ${error.message}`); // Set error message
      }
    }
  };

  return (
    <div className="Additional-Question">
      <h2>Step 3: Confirmation</h2><br />

      {/* Question 1 */}
      <p>Do you agree with the terms and conditions?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-check" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="termsAgreement"
            id={`termsAgreement${index}`}
            value={label}
            checked={termsAgreement === label}
            onChange={(e) => setTermsAgreement(e.target.value)}
          />
          <label className="radio-label" htmlFor={`termsAgreement${index}`}>{label}</label>
        </div>
      ))}

      {/* Question 2 */}
      <p>To your knowledge, do you have any relative working or who have worked for Immensphere?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-option" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="relativeWorking"
            id={`relativeWorking${index}`}
            value={label}
            checked={relativeWorking === label}
            onChange={(e) => setRelativeWorking(e.target.value)}
          />
          <label className="radio-label" htmlFor={`relativeWorking${index}`}>{label}</label>
        </div>
      ))}

      {/* Question 3 */}
      <p>Have you completed the form?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-option" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="formCompletion"
            id={`formCompletion${index}`}
            value={label}
            checked={formCompletion === label}
            onChange={(e) => setFormCompletion(e.target.value)}
          />
          <label className="radio-label" htmlFor={`formCompletion${index}`}>{label}</label>
        </div>
      ))}

      {/* Gender Select */}
      <select
        className="gender-select"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        aria-label="Gender"
      >
        <option value="">Gender</option>
        <option value="Female">Female</option>
        <option value="Male">Male</option>
        <option value="Neutral">Neutral</option>
      </select>

      {/* Checkboxes */}
      {["Checkbox 1", "Checkbox 2"].map((label, index) => (
        <div className="checkbox-option" key={index}>
          <input
            className="checkbox-input"
            type="checkbox"
            id={`flexCheck${index}`}
            checked={checkboxValues[index]}
            onChange={(e) => {
              const updatedCheckboxValues = [...checkboxValues];
              updatedCheckboxValues[index] = e.target.checked;
              setCheckboxValues(updatedCheckboxValues);
            }}
          />
          <label className="checkbox-label" htmlFor={`flexCheck${index}`}>{label}</label>
        </div>
      ))}

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step3;
