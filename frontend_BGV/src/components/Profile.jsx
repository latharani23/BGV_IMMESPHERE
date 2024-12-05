import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null); // State to store profile data
  const navigate = useNavigate();

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://your-api-url.com/getProfile');
        const result = await response.json();
        if (response.ok) {
          setProfile(result.data); // Set fetched profile data
        } else {
          console.error('Error fetching profile:', result.message);
          navigate('/login'); // Redirect to login if profile is not found
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="profile-container">
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>@{profile.username}</p>
          <p>{profile.bio}</p>
          {profile.profilePicture && <img src={profile.profilePicture} alt="Profile" />}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
