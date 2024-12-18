import React, { useState } from "react";
import axios from "axios";

const Step3 = () => {
  // State for form fields
  const [termsAgreement, setTermsAgreement] = useState(false);
  const [relativeWorking, setRelativeWorking] = useState("");
  const [formCompletion, setFormCompletion] = useState("");
  const [gender, setGender] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([false, false]);
  const [error, setError] = useState(null);

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

    // Form data model
    const formDataModel = {
      termsAgreement,
      relativeWorking,
      formCompletion,
      gender,
      checkboxValues,
    };

    console.log("Sending data:", formDataModel);

    try {
      const response = await axios.post("http://localhost:5000/submit-user-form", formDataModel);
      console.log("Form data saved:", response.data);
      alert(response.data.message);
      setError(null);
    } catch (error) {
      if (error.response) {
        console.error("Error from server:", error.response.data);
        setError(`Server Error: ${error.response.data.message}`);
      } else {
        console.error("Axios error:", error.message);
        setError(`Network Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="Additional-Question">
      <h2 className="heading">Step 3: Confirmation</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        {/* Question 1 */}
        <p>Do you agree with the terms and conditions?</p>
        {["Yes", "No"].map((label, index) => (
          <div className="radio-option" key={index}>
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
        <div className="position-field">
          <label htmlFor="gender" className="position-field-label"></label>
          <select
            id="gender"
            className="gender-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            aria-label="Gender"
          >
            <option value="">Select Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>

        {/* Checkboxes */}
        {["Checkbox 1", "Checkbox 2"].map((label, index) => (
          <div className="radio-option" key={index}>
            <input
              type="checkbox"
              id={`flexCheck${index}`}
              checked={checkboxValues[index]}
              onChange={() => handleCheckboxChange(index)}
              className="radio-input"
            />
            <label className="radio-label" htmlFor={`flexCheck${index}`}>{label}</label>
          </div>
        ))}

        {/* Submit Button */}
        <button
        type="submit"
        className="submit-btn"
        style={{
        color: 'white', // Text color
        backgroundColor:'#28a745'
        }}
>
  Submit
</button>
      </form>
    </div>
  );
};

export default Step3;