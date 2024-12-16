const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const FormData = require('./models/FormData'); // Import FormData model
const UserForm = require('./models/UserForm'); // Import UserForm model


app.use(express.json());

// Middleware
app.use(cors());
  // Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB (replace the URL with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/Background_Verification", { useNewUrlParser: true, useUnifiedTopology: true })
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
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Encrypt the password

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

// Function to create a JWT token
const createSecretToken = (userId) => {
  const token = jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
  return token;
};

// Route to handle user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Make sure this is set to true in production
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/home", (req, res) => {
  res.send("Welcome to the home page!");
});

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",  // Backend URL
  timeout: 5000,  // Optional timeout in ms
  headers: {
    "Content-Type": "application/json"
  }
});


app.post('/submitForm', (req, res) => {
  // Your form handling logic
  const formData = req.body;
  const newForm = new FormData(formData);
  newForm.save()
    .then(() => {
      console.log("form data saved to mongoDB:", formData);
      res.status(200).send("form submitted and saved sucessfully!!!");
    })
    .catch((error) => {
      console.error("error saving form data:", error);
      res.status(500).send ("error saving form data");
    });
  //console.log('Form submitted:', formData);
  //res.status(200).send('Form submitted successfully');
});



// Simulate fetching updated data from database
async function fetchDataFromDatabase() {
  try {
    const data = await FormData.findOne({}); // Replace with your query logic to fetch data
    return data;
  } catch (err) {
    throw new Error('Error fetching data from the database: ' + err.message);
  }
}

// API endpoint to get updated data
app.get('/getUpdatedData', async (req, res) => {
  console.log("Request received for /getUpdatedData");

  try {
    const updatedData = await fetchDataFromDatabase();
    console.log("Updated data:", updatedData);
    res.status(200).json(updatedData); // Send the fetched data as response
  } catch (err) {
    console.error("Error fetching updated data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Define storage for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .pdf or .txt files are allowed!'), false);
    }
    cb(null, true);
  }
});

// POST: Upload Resume
app.post('/upload', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(`File uploaded: ${req.file.filename}`);
  res.status(200).json({ message: 'Resume uploaded successfully!', file: req.file.filename });
});

app.get('/getUpdatedData', async (req, res) => {
  try {
    const userData = await User.findById('675beb6f710c8a370e1beeb6'); // Replace with user-specific logic
    res.json({
      ...userData.toObject(),
      resumeFileName: userData.resumeFileName || 'No Resume Uploaded'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});



/* step 3*/

// POST route to handle form submission
app.post('/submit-user-form', async (req, res) => {
  try {
    const formData = new UserForm(req.body); // Create a new UserForm document with the incoming data
    await formData.save(); // Save to the database
    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
});


// Assuming you've already defined UserForm model
app.get('/get-user-form', async (req, res) => {
  try {
    // Fetch all form data from the database
    const forms = await UserForm.find();  // If you only want the most recent data, you can adjust the query
    res.status(200).json(forms);  // Send data back as a JSON response
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ message: 'Error fetching form data', error: error.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
