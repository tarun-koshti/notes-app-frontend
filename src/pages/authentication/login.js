import { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleError from "../../utilities/handleError";
import authenticationService from "../../services/authenticationService";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);

  async function getOtp() {
    if (!email) {
      return false;
    }
    if (!isSendOtp) {
      return true;
    }
    try {
      const result = await authenticationService.login({ email });
      if (result.message) setMessage(result.message);
      setIsSendOtp(false);
      return true;
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
      setIsSendOtp(false);
      return false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const otpSendStatus = await getOtp();
    if (!otpSendStatus) {
      return;
    }
    if (!email || !otp) {
      setErrorMessage("Email and otp are required.");
      return;
    }
    try {
      const payload = { email, otp };
      setErrorMessage("");
      const response = await authenticationService.verifyOtp(payload);
      if (response.token) {
        authenticationService.setToken(response.token);
        onLogin();
      }
      navigate("/");
    } catch (error) {
      setErrorMessage(handleError(error));
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
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
        <button type="submit">Login</button>
      </form>
      {message && <pre>{message}</pre>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
