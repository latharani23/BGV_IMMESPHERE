import React, { useState } from "react";
import axios from "axios"; // for making HTTP requests

const FormComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [CurrentAddress, setCurrentAddress] = useState("");  
  const [UniversityGraduated, setUniversityGraduated] = useState("");  
  const [FieldOfStudy, setFieldOfStudy] = useState("");  
  const [PassedOutYear, setPassedOutYear] = useState("");  
  const [CGPA, setCGPA] = useState(""); 
  const [Position, setPosition] = useState(""); 
  const [organizationName, setOrganizationName] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);  
  const [error, setError] = useState('');


  

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
      if (CurrentAddress.trim() === '') {
        setError('Current Address is required');
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
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Collect form data in an object
    const formData = {
      name,
      email,
      PhoneNumber,
      PermanentAddress,
      CurrentAddress,
      UniversityGraduated,
      FieldOfStudy,
      PassedOutYear,
      CGPA,
      Position,
      organizationName,
      yearsOfExperience,
      companyLocation,
      panNumber
    };
  
    // Perform form validation before sending data
    if (validateForm()) {
      try {
        // Submit the form data to the backend
        const response = await axios.post('http://localhost:3001/submitForm', formData);
        
        // Check if the response status is OK (200)
        if (response.status === 200) {
          alert('Form submitted successfully');
          
          // Fetch the updated data after the form submission
          const updatedDataResponse = await axios.get('http://localhost:3001/getUpdatedData');
          
          // Update the state with the updated data
          if (updatedDataResponse.status === 200) {
            const updatedData = updatedDataResponse.data;
            
            setName(updatedData.name);
            setEmail(updatedData.email);
            setPhoneNumber(updatedData.PhoneNumber);
            setPermanentAddress(updatedData.PermanentAddress);
            setCurrentAddress(updatedData.CurrentAddress);
            setUniversityGraduated(updatedData.UniversityGraduated);
            setFieldOfStudy(updatedData.FieldOfStudy);
            setPassedOutYear(updatedData.PassedOutYear);
            setCGPA(updatedData.CGPA);
            setPosition(updatedData.Position);
            setOrganizationName(updatedData.organizationName);
            setYearsOfExperience(updatedData.yearsOfExperience);
            setCompanyLocation(updatedData.companyLocation);
            setPanNumber(updatedData.panNumber);
            
            // Optionally, you can navigate to a different page after successful submission and fetching updated data
            // useHistory().push('/success'); // Example
          }
        } else {
          alert('Error submitting form: ' + response.statusText);
        }
      } catch (error) {
        // Handle any errors that occur during the request
        alert('Error submitting form: ' + error.message);
      }
    }
  };
  
  
   

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
                type="email" 
                id="email" 
                placeholder="Enter your Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="form-field" 
                required
              />
              {!email && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>Email is required</p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="PhoneNumber">Phone Number<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="number" 
                id="PhoneNumber" 
                placeholder="Enter your Phone Number" 
                value={PhoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)} 
                className="form-field" 
                required
              />
              {!PhoneNumber && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>Phone Number is required</p>
              )}
            </div>

            <div className="form-field">
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <textarea id="permanentAddress" placeholder="Enter your Permanent Address" rows="4" required />
            </div>

            <div className="form-field">
              <label htmlFor="currentAddress">Current Address<span style={{ color: 'red' }}>*</span>:</label>
              <textarea 
                id="currentAddress" 
                placeholder="Enter your Current Address" 
                rows="4"
                value={CurrentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)} 
                className="form-field" 
                required
              />
              {!CurrentAddress && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>Current Address is required</p>
              )}
            </div>

            <h3>Education Details</h3>
            <div className="form-field">
              <label htmlFor="UniversityGraduated">University of Graduation<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="text" 
                id="UniversityGraduated" 
                placeholder="Enter your University of Graduation" 
                value={UniversityGraduated}
                onChange={(e) => setUniversityGraduated(e.target.value)} 
                className="form-field" 
                required
              />
              {!UniversityGraduated && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>University of Graduation is required</p>
              )}
            </div> 
            <div className="form-field">
                <label htmlFor="branch">Branch Name:</label>
                <input type="text" id="branch" placeholder="Enter your Branch Name" />
            </div>
    
            <div className="form-field">
              <label htmlFor="FieldOfStudy">Field of Study<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="text" 
                id="FieldOfStudy" 
                placeholder="Enter your Field of Study" 
                value={FieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)} 
                className="form-field" 
                required
              />
              {!FieldOfStudy && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>Field of Study is required</p>
              )}
            </div>
        </form>
    </div>
        <div className ="form-item"><br></br><br></br>
        <form>
            <div className="form-field">
              <label htmlFor="PassedOutYear">Passed Out Year<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="text" 
                id="PassedOutYear" 
                placeholder="Enter your Passed Out Year" 
                value={PassedOutYear}
                onChange={(e) => setPassedOutYear(e.target.value)} 
                className="form-field" 
                required
              />
              {!PassedOutYear && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>Passed Out Year is required</p>
              )}
            </div>
            <div className="form-field">
                  <label htmlFor="universityLocation">University Location:</label>
                  <textarea id="universityLocation" placeholder="Enter your University Location" rows="4" required />
            </div>

            <div className="form-field">
              <label htmlFor="CGPA">CGPA<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="text" 
                id="CGPA" 
                placeholder="Enter your CGPA" 
                value={CGPA}
                onChange={(e) => setCGPA(e.target.value)} 
                className="form-field" 
                required
              />
              {!CGPA && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>CGPA is required</p>
              )}
            </div>

            <h3>Working Details</h3>
            <div className="form-field">
                  <label htmlFor="Position">Position:</label>
                  <input type="Position" id="Position" placeholder="Enter your Position" />
            </div><br></br>
            <div className="form-field">
              <label htmlFor="organizationName">Organization Name<span style={{ color: 'red' }}>*</span>:</label>
              <input 
                type="text" 
                id="organizationName" 
                placeholder="Enter your Organization Name" 
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)} 
                className="form-field" 
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
                className="form-field" 
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
                className="form-field" 
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
                className="form-field" 
                required
              />
              {!panNumber && currentStep === 1 && (
                <p style={{ color: 'red', fontSize: '18px' }}>PAN/Aadhar Number is required</p>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
