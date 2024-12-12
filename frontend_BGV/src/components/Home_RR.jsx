import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Ensure to add necessary styles here
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure bootstrap-icons is installed

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [CV, setCV] = useState(null)
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState('');
  const [currentAddress, setcurrentAddress] = useState("");
  const [UniversityGraduated, setUniversityGraduated] = useState("");
  const [FieldOfStudy, setFieldOfStudy] = useState("");
  const [PassedOutYear, setPassedOutYear] = useState("");
  const [CGPA, setCGPA] = useState("");
  const [organizationName, setOrganizationName] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [companyLocation, setCompanyLocation] = useState('');
  const [panNumber, setPanNumber] = useState('');


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
    if (validateForm()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };


  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCV(event.target.files[0]);
    if (file) {
      setResume(file);
    }
    
  };
  const validateForm = () => {
    let isValid = true;
  
    if (currentStep === 1) {
      if (name.trim() === '') {
        setError('Name is required');
        isValid = false;
      }
      if (organizationName.trim() === '') {
        setError('Organization Name is required');
        isValid = false;
      }
      if (email.trim() === '') {
        setError('Email is required');
        isValid = false;
      }
      if (PhoneNumber.trim() === '') {
        setError('Phone Number Name is required');
        isValid = false;
      }
      if (currentAddress.trim() === '') {
        setError('CurrentAddress Name is required');
        isValid = false;
      }
      if (UniversityGraduated.trim() === '') {
        setError('University Name is required');
        isValid = false;
      }
      if (FieldOfStudy.trim() === '') {
        setError('Field Of Study Name is required');
        isValid = false;
      }
      if (PassedOutYear.trim() === '') {
        setError('PassedOutRequired is required');
        isValid = false;
      }
      if (CGPA.trim() === '') {
        setError('CGPA is required');
        isValid = false;
      }
      if (yearsOfExperience.trim() === '') {
        setError('Years of Experience is required');
        isValid = false;
      }
      if (companyLocation.trim() === '') {
        setError('Company Location is required');
        isValid = false;
      }
      if (panNumber.trim() === '') {
        setError('PAN/Aadhar Number is required');
        isValid = false;
      }
  
      if (!isValid) return false;
  
      setError(''); // Clear error if all fields are valid
      return true; 
    }

  if (currentStep === 2) {
    if (!resume) {
      setError('Resume is required');
      isValid = false;
    }

    if (!isValid) return false;

    setError(''); // Clear error if all fields are valid
  }

  return true;
};



  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-container">
            <div className="grid-container">
              <div className="form-item">
                <h3>Personal Details</h3>
                <form>
                <div className="form-field">
                  <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Name is required</p>
                  )}
                  </div>

                 
                  <div className="form-field">
                  <label htmlFor="email">Email:<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="Email" 
                    id="Email" 
                    placeholder="Enter your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Email is required</p>
                  )}
                  </div>
                 
                  <div className="form-field">
                  <label htmlFor="PhoneNumber">PhoneNumber<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="number" 
                    id="PhoneNumber" 
                    placeholder="Enter your Phone Number" 
                    value={PhoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>PhoneNumber is required</p>
                  )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="permanentAddress">Permanent Address:</label>
                    <textarea id="permanentAddress" placeholder="Enter your Permanent Address" rows="4" required />
                  </div>
                  <div className="form-field">
                    <label htmlFor="currentAddress">Current Address:<span style={{ color: 'red' }}>*</span>:</label>
                    <textarea id="currentAddress" placeholder="Enter your Current Address" rows="4"
                      value={currentAddress}
                      onChange={(e) => setcurrentAddress(e.target.value)} 
                      className="form-field" 
                      required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>CurrentAddress is required</p>
                  )}
                  </div>
                  

                <h3>Education Details</h3>
                  
                  <div className="form-field">
                  <label htmlFor="name">University of Graduated<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your University Of Graduated Name" 
                    value={UniversityGraduated}
                    onChange={(e) => setUniversityGraduated(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Univers Of Graduated is required</p>
                  )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="branch">Branch Name:</label>
                    <input type="text" id="branch" placeholder="Enter your Branch Name" />
                  </div>
                  
                  <div className="form-field">
                  <label htmlFor="name">Field of Study<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your Field of Study" 
                    value={FieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Field Of Study is required</p>
                  )}
                  </div>
                  
                  
                </form>  
          </div>

                <div className="form-item">
                <form>
                
                  <div className="form-field">
                  <label htmlFor="name">Passed Out Year<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="Name" 
                    id="name" 
                    placeholder="Enter your Passed Out Year" 
                    value={PassedOutYear}
                    onChange={(e) => setPassedOutYear(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Passed out year is required</p>
                  )}
                  </div>
                <div className="form-field">
                    <label htmlFor="universityLocation">University Location:</label>
                    <textarea id="universityLocation" placeholder="Enter your University Location" rows="4" required />
                  </div>
                  <div className="form-field">
                  <label htmlFor="name">CGPA<span style={{ color: 'red' }}>*</span>:</label>
                  <input 
                    type="Number" 
                    id="Number" 
                    placeholder="Enter your CGPA" 
                    value={CGPA}
                    onChange={(e) => setCGPA(e.target.value)} 
                    className="form-field" 
                    required
                  />
                  {!name && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>CGPA is required</p>
                  )}
                  </div>
                <h3>Working Details</h3>
                <div className="form-field"></div>
                <div className="form-field">
                    <label htmlFor="position">Position:</label>
                    <input type="text" id="position" placeholder="Enter your Position" />
                  </div>
                  <div className="form-field">
                    <label htmlFor="organizationName">Organization Name<span style={{ color: 'red' }}>*</span>:</label>
                    <input
                      type="text"
                      id="organizationName"
                      placeholder="Enter your Organization Name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      required
                    />
                    {!organizationName && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Organization Name is required</p>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="yearsOfExperience">Years of Experience<span style={{ color: 'red' }}>*</span>:</label>
                    <input
                      type="text"
                      id="yearsOfExperience"
                      placeholder="Enter Years of Experience"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                      required
                    />
                    {!yearsOfExperience && currentStep === 1 && (
                    <p style={{ color: 'red', fontSize: '18px' }}>Years of Experience is required</p>
                    )}  
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="companyLocation">Company Location<span style={{ color: 'red' }}>*</span>:</label>
                      <textarea
                        id="companyLocation"
                        placeholder="Enter your Company Location"
                        rows="4"
                        value={companyLocation}
                        onChange={(e) => setCompanyLocation(e.target.value)}
                        required
                      />
                      {!companyLocation && currentStep === 1 && (
                      <p style={{ color: 'red', fontSize: '18px' }}>Company Location is required</p>
                      )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="panNumber">Pan Number/Aadhar Number<span style={{ color: 'red' }}>*</span>:</label>
                      <input
                        type="text"
                        id="panNumber"
                        placeholder="Enter your PAN/Aadhar Number"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        required
                      />
                      {!panNumber && currentStep === 1 && (
                      <p style={{ color: 'red', fontSize: '18px' }}>PAN/Aadhar Number is required</p>
                      )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
    case 2:
      return (
        <div>
          <div className="step-content">
            <h3>Step 2: Upload Resume</h3>
            <form>
              <div>
                <label htmlFor="resume">Resume(PDF, DOCX):</label>
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {resume && <p>Selected File: {resume.name}</p>}
              {!resume && (
                <p style={{ color: 'red', fontSize: '18px' }}>Resume is required</p>
              )}
            </form>
          </div>
          <div className="step-content">
            <h3> Upload CV</h3>
            <form>
              <div>
                <label htmlFor="CV">CV(PDF, DOCX):</label>
                <input
                  type="file"
                  id="CV"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
              {CV && <p>Selected File: {CV.name}</p>}
            </form>
          </div>
        </div>
        );
        case 3:
          return (
            <div className="Additional-Question">
              <h2>Step 3: Confirmation</h2><br></br>

              {/* Question 1 */}
              <p> Do you agree with the terms and conditions?</p>
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
              <p>To Your Knowledge, do you have any relative working or who have worked for Immensphere?</p>
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
          

              <select class="gender-select" aria-label="Default select example">
                <option selected>Gender</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
                <option value="3">Neutral</option>
              </select>
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
