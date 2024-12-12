import React from 'react';
import { useLocation } from 'react-router-dom';

const Validate = () => {
  const location = useLocation();
  const { formData } = location.state; // Access the passed formData

  return (
    <div className="validation-container">
      <h2>Submitted Information</h2>
      <h3>Personal Details:</h3>
      <p>Name: {formData.personalDetails.name}</p>
      <p>Email: {formData.personalDetails.email}</p>
      <p>Phone Number: {formData.personalDetails.phoneNumber}</p>
      <p>Current Address: {formData.personalDetails.currentAddress}</p>
      <p>University Graduated: {formData.personalDetails.universityGraduated}</p>
      <p>Field of Study: {formData.personalDetails.fieldOfStudy}</p>
      <p>Passed Out Year: {formData.personalDetails.passedOutYear}</p>
      <p>CGPA: {formData.personalDetails.cgpa}</p>
      <p>Organization Name: {formData.personalDetails.organizationName}</p>
      <p>Years of Experience: {formData.personalDetails.yearsOfExperience}</p>
      <p>Company Location: {formData.personalDetails.companyLocation}</p>
      <p>PAN/Aadhar Number: {formData.personalDetails.panNumber}</p>
      <h3>Uploaded Files:</h3>
      {formData.resume && <p>Resume: {formData.resume.name}</p>}
      {formData.cv && <p>CV: {formData.cv.name}</p>}
      <h3>Confirmation:</h3>
      <p>Terms Agreement: {formData.confirmation.termsAgreement}</p>
      <p>Relative Working: {formData.confirmation.relativeWorking}</p>
      <p>Form Completion: {formData.confirmation.formCompletion}</p>
    </div>
  );
};

export default Validate;