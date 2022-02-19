import { Link } from "react-router-dom";
import HomeIcon from "../common/HomeIcon";
import { useState, useEffect } from "react";
import { register } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

    if (error) {
      alert(error.message);
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
    <body>
      <div class="auth">
        <div class="card">
          <div class="auth__header text-center">
            <HomeIcon />
            <h3>Account SignUp</h3>
            <p>Create a new developer account</p>
          </div>

          <form action="#" class="form auth__form" onSubmit={submitHanlder}>
            <div class="form__field">
              <label for="formInput#text">Username: </label>
              <input
                class="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div class="form__field">
              <label for="formInput#text">First Name: </label>
              <input
                class="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div class="form__field">
              <label for="formInput#text">Last Name: </label>
              <input
                class="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div class="form__field">
              <label for="formInput#email">Email Address: </label>
              <input
                class="input input--email"
                id="formInput#email"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div class="form__field">
              <label for="formInput#password">Password: </label>
              <input
                class="input input--password"
                id="formInput#passowrd"
                type="password"
                name="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div class="form__field">
              <label for="formInput#confirm-password">Confirm Password: </label>
              <input
                class="input input--password"
                id="formInput#confirm-passowrd"
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div class="auth__actions">
              <input
                class="btn btn--sub btn--lg"
                type="submit"
                value="Sign  In"
              />
            </div>
          </form>
          <div class="auth__alternative">
            <p>Already have an Account?</p>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Register;
