import React, { useState } from "react";
import userService from "../../services/userService";

const UpdateProfile = ({ userData, handleEdit }) => {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await userService.updateMyProfile({ email, name });
      setErrorMessage(null);
      handleEdit(false, result.data);
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
    }
  };
  return (
    <div>
      {errorMessage && <pre>{errorMessage}</pre>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
export default UpdateProfile;
