import React, { useState } from "react";
import './EditProfile.css'; // Ensure to create a corresponding CSS file
import { useNavigate } from 'react-router-dom';


const ProfileEdit = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [updatedProfile, setUpdatedProfile] = useState(null); // To store updated profile info

  const handleSubmit = (e) => {
    e.preventDefault();

    // Just simulate a successful profile update here
    const updatedProfileData = {
      name,
      username,
      email,
      bio,
      profilePic,
    };

    // Set updated profile information
    setUpdatedProfile(updatedProfileData);

    // Set success message
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="profile-edit-container">
      <h2 className="title">Edit Profile</h2>
      
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"></label>
          <input
            id="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username"></label>
          <input
            id="username"
            placeholder="UserName"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"></label>
          <input
            id="email"
            type="email"
            placeholder="Email"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio"></label>
          <textarea
            id="bio"
            value={bio}
            placeholder="Bio:"

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
