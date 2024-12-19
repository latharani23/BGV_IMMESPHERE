const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  PhoneNumber: String,
  CurrentAddress: String,
  UniversityGraduated: String,
  FieldOfStudy: String,
  PassedOutYear: String,
  UniversityLocation: String,
  CGPA: String,
  organizationName: String,
  yearsOfExperience: String,
  companyLocation: String,
  panNumber: String,
  gender: String,
  termsAgreement: Boolean,
  relativeWorking: Boolean,
  formCompletion: Boolean,
  checkboxValues: [Boolean],
});

// Declare the User model
const UserModel = mongoose.model("User ", userSchema); // Note: No space after "User "

// Export the UserModel
module.exports = UserModel;