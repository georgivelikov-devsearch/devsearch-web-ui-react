import { Link } from "react-router-dom";
import HomeIcon from "../common/HomeIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    dispatch(login(username, password));
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <HomeIcon />
          <h3>Account Login</h3>
          <p>Hello Developer, Welcome Back!</p>
        </div>

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
