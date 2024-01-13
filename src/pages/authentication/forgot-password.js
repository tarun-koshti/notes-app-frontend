import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authenticationService from "../../services/authenticationService";
import handleError from "../../utilities/handleError";

export default function ForgotPassword({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function forgotPassword(event) {
    event.preventDefault();
    if (!email) {
      setErrorMessage("Please Fill Email");
      return;
    }

    try {
      await authenticationService.forgotPassword({ email });
      setIsOtpSend(true);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(handleError(error));
    }
  }

  async function resetPassword(event) {
    event.preventDefault();
    if (!email || !password || !confirmPassword || !otp) {
      setErrorMessage("Please fill all the fields");
    }
    try {
      const payload = { email, otp, password, confirmPassword };
      const response = await authenticationService.resetPassword(payload);
      if (response.token) {
        authenticationService.setToken(response.token);
        onLogin();
      }
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(handleError(error));
    }
  }

  return (
    <div>
      <form onSubmit={resetPassword}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Otp</label>
          <input
            type="number"
            value={otp}
            placeholder="Otp"
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={forgotPassword}>
            Get Otp
          </button>
        </div>
        <div>
          <button type="submit">Change Password</button>
        </div>
      </form>
      {isOtpSend && <p>Otp has been sent to your email</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
