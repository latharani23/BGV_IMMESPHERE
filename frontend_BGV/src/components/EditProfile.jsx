import React, { useState } from "react";
import './EditProfile.css'; // Ensure to create a corresponding CSS file

const ProfileEdit = () => {
  // State initialization
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("bio", bio);
    if (profilePic) {
      formData.append("profilePic", profilePic); // Appending the profile picture to the FormData object
    }

    // Send POST request to backend
    fetch("http://localhost:3000/updateProfile", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setMessage("Profile updated successfully!");
        setUpdatedProfile(data); // Assuming the response contains updated profile data
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage("Failed to update profile.");
      });
  };

  return (
    <div className="profile-edit-container">
      <h2 className="title">Edit Profile</h2>

      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <button type="submit" className="submit-btn">Update Profile</button>
      </form>

      {message && <p className="success-message">{message}</p>} {/* Display success message */}

      {updatedProfile && (
        <div className="updated-profile">
          <h3>Updated Profile Information:</h3>
          <p><strong>Name:</strong> {updatedProfile.name}</p>
          <p><strong>Username:</strong> {updatedProfile.username}</p>
          <p><strong>Email:</strong> {updatedProfile.email}</p>
          <p><strong>Bio:</strong> {updatedProfile.bio}</p>
          {updatedProfile.profilePic && (
            <div>
              <strong>Profile Picture:</strong>
              <img
                src={URL.createObjectURL(updatedProfile.profilePic)}
                alt="Profile"
                style={{ maxWidth: "150px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
