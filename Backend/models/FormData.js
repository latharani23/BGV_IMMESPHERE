const mongoose = require('mongoose');

// Define the form schema with required validation for all fields
const formDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  CurrentAddress: { type: String, required: true },
 /* PermanentAddress: { type: String, required: true },*/
  UniversityGraduated: { type: String, required: true },
  FieldOfStudy: { type: String, required: true },
  PassedOutYear: { type: String, required: true },
  CGPA: { type: String, required: true },
  /*Position: { type: String, required: true },*/
  organizationName: { type: String, required: true },
  yearsOfExperience: { type: String, required: true },
  companyLocation: { type: String, required: true },
  panNumber: { type: String, required: true }
});

// Create and export the model based on the schema with the name 'FormModel'
const FormData = mongoose.model('FormData', formDataSchema);
module.exports = FormData;
