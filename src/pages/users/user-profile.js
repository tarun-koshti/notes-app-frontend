import React, { useState, useEffect } from "react";
import userService from "../../services/userService";
import UpdateProfile from "./update-profile";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getMyProfile();
        setProfile(response.data);
        setLoading(false);
        setErrorMessage(null);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = (is_edit, userData) => {
    setIsEdit(is_edit);
    if (userData) {
      setProfile(userData);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      {!isEdit && (
        <button onClick={(e) => setIsEdit(true)}>Edit Profile</button>
      )}
      {isEdit && <UpdateProfile userData={profile} handleEdit={handleEdit} />}
      <div>
        <strong>Name: {profile.name}</strong>
        <br />
        <span>Email: {profile.email}</span>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default Profile;
