import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure to add necessary styles here
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure bootstrap-icons is installed

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("User logged out!");
    alert("Logged out successfully!");
    navigate("/Signup");
  };

  const handleProfile = () => {
    console.log("Navigating to profile...");
    navigate("/EditProfile");
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-container">
            <h3>Step 1: Enter Your Personal and Working/Education Details</h3>
            <div className="grid-container">
              <div className="form-item">
                <h4>Personal Details</h4>
                <form>
                  <div className="form-field">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter your name" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Enter your email" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" placeholder="Enter your Phone Number" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="permanentAddress">Permanent Address:</label>
                    <textarea id="permanentAddress" placeholder="Enter your Permanent Address" rows="4" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="currentAddress">Current Address:</label>
                    <textarea id="currentAddress" placeholder="Enter your Current Address" rows="4" required />
                  </div>
                </form>
              </div>

              <div className="form-item">
                <h4>Education Details</h4>
                <form>
                  <div className="form-field">
                    <label htmlFor="universityGraduated">University of Graduation:</label>
                    <input type="text" id="universityGraduated" placeholder="Enter your University Name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="branch">Branch Name:</label>
                    <input type="text" id="branch" placeholder="Enter your Branch Name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="fieldOfStudy">Field of Study:</label>
                    <input type="text" id="fieldOfStudy" placeholder="Enter Field of Study" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="passedOutYear">Passed Out Year:</label>
                    <input type="text" id="passedOutYear" placeholder="Enter your Passed Out Year" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="universityLocation">University Location:</label>
                    <textarea id="universityLocation" placeholder="Enter your University Location" rows="4" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="cgpa">CGPA:</label>
                    <input type="number" id="cgpa" placeholder="Enter your CGPA" required />
                  </div>
                </form>
              </div>

              <div className="form-item">
                <h4>Working Details</h4>
                <form>
                  <div className="form-field">
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" placeholder="Enter your Position" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="organizationName">Organization Name:</label>
                    <input type="text" id="organizationName" placeholder="Enter your Organization Name" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="yearsOfExperience">Years of Experience:</label>
                    <input type="text" id="yearsOfExperience" placeholder="Enter Years of Experience" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="companyLocation">Company Location:</label>
                    <textarea id="companyLocation" placeholder="Enter your Company Location" rows="4" required />
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h3>Step 2: Upload Resume</h3>
            <form>
              <div>
                <label htmlFor="resume">Resume (PDF, DOCX):</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {resume && <p>Selected File: {resume.name}</p>}
            </form>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h3>Step 3: Confirmation</h3>
            <p>Your information has been successfully submitted!</p>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h3>Step 4: Final Step</h3>
            <p>Thank you for completing the steps!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#"></a>
        <div className="navbar-icons">
          <i
            className="bi bi-person-circle icon profile-icon"
            onClick={handleProfile}
            title="Profile"
          ></i>
          <i
            className="bi bi-box-arrow-right icon logout-icon"
            onClick={handleLogout}
            title="Logout"
          ></i>
        </div>
      </nav>

      {/* Steps Progress */}
      <div className="stepper-wrapper">
        <div className={`stepper-item ${currentStep >= 1 ? "completed" : ""} ${currentStep === 1 ? "active" : ""}`}>
          <div className="step-counter">1</div>
          <div className="step-name">First</div>
        </div>
        <div className={`stepper-item ${currentStep >= 2 ? "completed" : ""} ${currentStep === 2 ? "active" : ""}`}>
          <div className="step-counter">2</div>
          <div className="step-name">Second</div>
        </div>
        <div className={`stepper-item ${currentStep >= 3 ? "completed" : ""} ${currentStep === 3 ? "active" : ""}`}>
          <div className="step-counter">3</div>
          <div className="step-name">Third</div>
        </div>
        <div className={`stepper-item ${currentStep >= 4 ? "completed" : ""} ${currentStep === 4 ? "active" : ""}`}>
          <div className="step-counter">4</div>
          <div className="step-name">Forth</div>
        </div>
      </div>

      {/* Step Content */}
      <div className="step-content-container">{renderStepContent()}</div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={nextStep}
          disabled={currentStep === 4}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
