const mongoose = require('mongoose');

// Define the schema for updated user data
const UpdatedUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    CurrentAddress: { type: String, required: true },
    UniversityGraduated: { type: String, required: true },
    FieldOfStudy: { type: String, required: true },
    PassedOutYear: { type: String, required: true },
    UniversityLocation: { type: String, required: true },
    CGPA: { type: String, required: true },
    organizationName: { type: String, required: true },
    yearsOfExperience: { type: String, required: true },
    companyLocation: { type: String, required: true },
    panNumber: { type: String, required: true },
    gender: { type: String, required: true },
    termsAgreement: { type: Boolean, required: true },
    relativeWorking: { type: Boolean, required: true },
    formCompletion: { type: Boolean, required: true },
    checkboxValues: { type: [Boolean], default: [false, false] }, // Array of two booleans
});

// Create the model from the schema
const UpdatedUser  = mongoose.model('UpdatedUser ', UpdatedUserSchema);

// Export the model
module.exports = { UpdatedUser  };