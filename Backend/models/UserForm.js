const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  termsAgreement: { type: String, required: true, enum: ['Yes', 'No'] },
  relativeWorking: { type: String, required: true, enum: ['Yes', 'No'] },
  formCompletion: { type: String, required: true, enum: ['Yes', 'No'] },
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  checkboxValues: { type: [Boolean], required: true },
});

module.exports = mongoose.model('UserForm', formSchema);
