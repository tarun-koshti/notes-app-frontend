import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticationService from "../../services/authenticationService";

export default function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();
  const [isValid, setIsValid] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [message, setMessage] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);

  async function getOtp() {
    if (!email || !name) {
      setErrorMessage("Name and Email are Required.");
      return false;
    }
    if (!isSendOtp) {
      return true;
    }
    try {
      const result = await authenticationService.signup({ email, name });
      if (result.message) setMessage(result.message);
      setIsSendOtp(false);
      setErrorMessage("");
      return true;
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
      setIsSendOtp(false);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpSendStatus = await getOtp();
    if (!otpSendStatus) {
      return;
    }
    if (!email || !otp) {
      setErrorMessage("Email and Otp are Required.");
      setIsValid(false);
      return;
    }
    setIsValid(true);
    try {
      const payload = { email, otp };
      console.log(payload);
      setErrorMessage("");
      const response = await authenticationService.verifyOtp(payload);
      if (response.token) {
        authenticationService.setToken(response.token);
        onLogin();
      }
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Otp</label>
        <input
          type="otp"
          value={otp}
          placeholder="Otp"
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button type="submit" onClick={(e) => setIsSendOtp(true)}>
          Generate Otp
        </button>
        <br />
        <button type="submit">Signup</button>
      </form>
      {!isValid && <p>Please Fill all the fields</p>}
      {message && <p>{message}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
