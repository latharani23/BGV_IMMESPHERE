import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
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
