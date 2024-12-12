import React from "react";

const Step3 = () => {
  return (
    <div className="Additional-Question">
      <h2>Step 3: Confirmation</h2><br></br>

      {/* Question 1 */}
      <p>Do you agree with the terms and conditions?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-check" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="termsAgreement" // Unique name for this set
            id={`termsAgreement${index}`}
            defaultChecked={index === 1} // Check the second radio button by default
          />
          <label className="radio-label" htmlFor={`termsAgreement${index}`}>
            {label}
          </label>
        </div>
      ))}

      {/* Question 2 */}
      <p>To your knowledge, do you have any relative working or who have worked for Immensphere?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-option" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="relativeWorking" // Unique name for this set
            id={`relativeWorking${index}`}
            defaultChecked={index === 1} // Check the second radio button by default
          />
          <label className="radio-label" htmlFor={`relativeWorking${index}`}>
            {label}
          </label>
        </div>
      ))}

      {/* Question 3 */}
      <p>Have you completed the form?</p>
      {["Yes", "No"].map((label, index) => (
        <div className="radio-option" key={index}>
          <input
            className="radio-input"
            type="radio"
            name="formCompletion" // Unique name for this set
            id={`formCompletion${index}`}
            defaultChecked={index === 1} // Check the second radio button by default
          />
          <label className="radio-label" htmlFor={`formCompletion${index}`}>
            {label}
          </label>
        </div>
      ))}

      {/* Gender Select */}
      <select className="gender-select" aria-label="Default select example">
        <option selected>Gender</option>
        <option value="1">Female</option>
        <option value="2">Male</option>
        <option value="3">Neutral</option>
      </select>

      {/* Position Field */}
      <div className="position-field">
        <label htmlFor="position"></label>
        <input type="text" id="position" />
      </div>

      {/* Checkboxes */}
      {[" checkbox", "checkbox"].map((label, index) => (
        <div className="checkbox-option" key={index}>
          <input
            className="checkbox-input"
            type="checkbox"
            id={`flexCheck${index}`}
            defaultChecked={true} // Check the second checkbox by default
          />
          <label className="checkbox-label" htmlFor={`flexCheck${index}`}>
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Step3;
