import { useState, useEffect } from "react";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "../common/HomeIcon";
import Message from "../common/Message";
import Loader from "../common/Loader";

function Register() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, newUserInfo } = userRegister;

  useEffect(() => {
    if (newUserInfo) {
      navigate("/login");
    }
  }, [navigate, newUserInfo]);

  const submitHanlder = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    dispatch(register(userData));
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
          <div className="auth__actions">
            <input
              className="btn btn--sub btn--lg"
              type="submit"
              value="Sign  In"
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
