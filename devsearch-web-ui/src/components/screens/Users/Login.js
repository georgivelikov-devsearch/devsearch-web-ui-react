import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../actions/userActions";
import { validateStringLength } from "../../../utils/validator";
import { USER_VALIDATION } from "../../../constants/userConstants";

import HomeIcon from "../../common/HomeIcon";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validUsernameErrMessage, setValidUsernameErrMessage] = useState("");
  const [validPasswordErrMessage, setValidPasswordErrMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHanlder = (e) => {
    e.preventDefault();

    let isValid = validateStringLength(
      username,
      USER_VALIDATION.USERNAME_MIN_LENGTH,
      USER_VALIDATION.USERNAME_MAX_LENGTH,
      "Username"
    );
    setValidUsername(isValid.result);
    if (!isValid.result) {
      setValidUsernameErrMessage(isValid.message);
      return;
    }

    isValid = validateStringLength(
      password,
      USER_VALIDATION.PASSWORD_MIN_LENGTH,
      USER_VALIDATION.PASSWORD_MAX_LENGTH,
      "Password"
    );
    setValidPassword(isValid.result);
    if (!isValid.result) {
      setValidPasswordErrMessage(isValid.message);
      return;
    }

    dispatch(login(username, password));
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <HomeIcon />
          <h3>Profile Login</h3>
          <p>Hello Developer, Welcome Back!</p>
        </div>
        {error && (
          <Message
            variant="alert alert--error"
            variantStyle={{ width: "100%" }}
            message={error.additionalInformation}
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
              name="username"
              placeholder="Enter your username..."
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
          <div className="auth__actions">
            <input
              className="btn btn--sub btn--lg"
              type="submit"
              value="Log In"
            />
            <Link to="/forgetpassword">Forget Password?</Link>
          </div>
        </form>
        <div className="auth__alternative">
          <p>Don’t have an Account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
