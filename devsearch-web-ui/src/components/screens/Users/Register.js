import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../../actions/userActions";
import { validateStringLength } from "../../../utils/validator";
import { USER_VALIDATION } from "../../../constants/userConstants";
import { PROFILE_VALIDATION } from "../../../constants/profileConstants";

import { Link } from "react-router-dom";
import HomeIcon from "../../common/HomeIcon";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordAlertMessage, setConfirmPasswordAlertMessage] =
    useState("");

  const [validUsername, setValidUsername] = useState(true);
  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [validUsernameErrMessage, setValidUsernameErrMessage] = useState("");
  const [validFirstNameErrMessage, setValidFirstNameErrMessage] = useState("");
  const [validLastNameErrMessage, setValidLastNameErrMessage] = useState("");
  const [validEmailErrMessage, setValidEmailErrMessage] = useState("");
  const [validPasswordErrMessage, setValidPasswordErrMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading } = userRegister;

  const submitHanlder = (e) => {
    e.preventDefault();

    // Clear all previous values for validation
    clearValidation();

    // Validation
    let validationSuccess = validateFields();

    if (!validationSuccess) {
      return;
    }

    // Check if passwords match
    if (confirmPassword !== password) {
      setConfirmPasswordAlertMessage("Passwords do not match!");
      return;
    }

    // Register
    const userData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    dispatch(register(userData, navigate));
  };

  const validateFields = () => {
    // Username validation
    let isValid = validateStringLength(
      username,
      USER_VALIDATION.USERNAME_MIN_LENGTH,
      USER_VALIDATION.USERNAME_MAX_LENGTH,
      "Username"
    );
    setValidUsername(isValid.result);
    if (!isValid.result) {
      setValidUsernameErrMessage(isValid.message);
      return false;
    }

    // First Name validation
    isValid = validateStringLength(
      firstName,
      PROFILE_VALIDATION.FIRSTNAME_MIN_LENGTH,
      PROFILE_VALIDATION.FIRSTNAME_MAX_LENGTH,
      "First Name"
    );
    setValidFirstName(isValid.result);
    if (!isValid.result) {
      setValidFirstNameErrMessage(isValid.message);
      return false;
    }

    // Last Name validation
    isValid = validateStringLength(
      lastName,
      PROFILE_VALIDATION.LASTNAME_MIN_LENGTH,
      PROFILE_VALIDATION.LASTNAME_MAX_LENGTH,
      "Last Name"
    );
    setValidLastName(isValid.result);
    if (!isValid.result) {
      setValidLastNameErrMessage(isValid.message);
      return false;
    }

    // Email validation
    isValid = validateStringLength(
      email,
      USER_VALIDATION.EMAIL_MIN_LENGTH,
      USER_VALIDATION.EMAIL_MAX_LENGTH,
      "Email"
    );
    setValidEmail(isValid.result);
    if (!isValid.result) {
      setValidEmailErrMessage(isValid.message);
      return false;
    }

    // Password validation
    isValid = validateStringLength(
      password,
      USER_VALIDATION.PASSWORD_MIN_LENGTH,
      USER_VALIDATION.PASSWORD_MAX_LENGTH,
      "Password"
    );
    setValidPassword(isValid.result);
    if (!isValid.result) {
      setValidPasswordErrMessage(isValid.message);
      return false;
    }

    return true;
  };

  const clearValidation = () => {
    setConfirmPasswordAlertMessage("");

    setValidUsername(true);
    setValidFirstName(true);
    setValidLastName(true);
    setValidEmail(true);
    setValidPassword(true);

    setValidUsernameErrMessage("");
    setValidFirstNameErrMessage("");
    setValidLastNameErrMessage("");
    setValidEmailErrMessage("");
    setValidPasswordErrMessage("");
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <HomeIcon />
          <h3>Account SignUp</h3>
          <p>Create a new developer account</p>
        </div>
        {error && (
          <Message
            variant="alert alert--error"
            variantStyle={{ width: "100%" }}
            message={error.message}
          />
        )}
        {loading && <Loader />}
        <form action="#" className="form auth__form" onSubmit={submitHanlder}>
          <div className="form__field">
            <label htmlFor="formInput#text">Username: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {!validUsername && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validUsernameErrMessage}
            />
          )}

          <div className="form__field">
            <label htmlFor="formInput#text">First Name: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {!validFirstName && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validFirstNameErrMessage}
            />
          )}

          <div className="form__field">
            <label htmlFor="formInput#text">Last Name: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {!validLastName && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validLastNameErrMessage}
            />
          )}

          <div className="form__field">
            <label htmlFor="formInput#email">Email Address: </label>
            <input
              className="input input--email"
              id="formInput#email"
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {!validEmail && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validEmailErrMessage}
            />
          )}

          <div className="form__field">
            <label htmlFor="formInput#password">Password: </label>
            <input
              className="input input--password"
              id="formInput#passowrd"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!validPassword && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validPasswordErrMessage}
            />
          )}

          <div className="form__field">
            <label htmlFor="formInput#confirm-password">
              Confirm Password:{" "}
            </label>
            <input
              className="input input--password"
              id="formInput#confirm-passowrd"
              type="password"
              name="confirm-password"
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {confirmPasswordAlertMessage && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={confirmPasswordAlertMessage}
            />
          )}
          <div className="auth__actions">
            <input
              className="btn btn--sub btn--lg"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
        <div className="auth__alternative">
          <p>Already have an Account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
