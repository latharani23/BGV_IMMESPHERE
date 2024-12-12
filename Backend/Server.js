const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
// Middleware
app.use(cors());

// Connect to MongoDB (replace the URL with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/mern_signup", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Route to handle user signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered / Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error. Please Try Again Later" });
  }
});
//Function to create a JWT token
const createSecretToken = (userId) => {
  const token = jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
  return token;
};
// Route to handle user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Compare password with stored hash
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    // Create JWT token
    const token = createSecretToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure this is set to true in production
    });

    // Send success response
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  
});
app.get("/home", (req, res) => {
  res.send("welcome to the home page!");
});


// Schema definition for the form
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  permanentAddress: String,
  currentAddress: String,
  universityGraduated: String,
  fieldOfStudy: String,
  passedOutYear: String,
  cgpa: String,
  position: String,
  organizationName: String,
  yearsOfExperience: String,
  companyLocation: String,
  panNumber: String,
});

const Form = mongoose.model('Form', formSchema);

app.post('/submitForm', async (req, res) => {
  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      return res.status(400).json({ message: "Name, email, and phone number are required fields." });
    }

    // Save form data to the database
    const newForm = new Form(formData);
    await newForm.save();

    // Respond with success status
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error("Error storing form data:", error.message);
    res.status(500).json({ message: 'Error storing form data', error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});