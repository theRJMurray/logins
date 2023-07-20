import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Fetch the user profile data when the component mounts or when 'username' changes
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${username}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile: {userProfile.username}</h2>
      <p>Email: {userProfile.email}</p>
      <p>bio: {userProfile.bio}</p>
      {/* Display other profile data */}
    </div>
  );
};

export default UserProfile;
