import { Link } from "react-router-dom";
import HomeIcon from "../common/HomeIcon";

function Register() {
  return (
    <body>
      <div class="auth">
        <div class="card">
          <div class="auth__header text-center">
            <HomeIcon />
            <h3>Account SignUp</h3>
            <p>Create a new developer account</p>
          </div>

          <form action="#" class="form auth__form">
            <div class="form__field">
              <label for="formInput#text">Full Name: </label>
              <input
                class="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="e.g. Dennis Ivanov"
              />
            </div>

            <div class="form__field">
              <label for="formInput#email">Email Address: </label>
              <input
                class="input input--email"
                id="formInput#email"
                type="email"
                name="email"
                placeholder="e.g. user@domain.com"
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
