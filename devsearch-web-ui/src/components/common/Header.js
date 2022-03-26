import UserService from "../../services/identity/keycloak/keycloakUserService";

import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container container--narrow">
        <Link className="header__logo" to="/developers?page=1">
          <img src="/images/logo.svg" alt="DevSearch Logo" />
        </Link>
        <nav className="header__nav">
          <input type="checkbox" id="responsive-menu" />
          <label htmlFor="responsive-menu" className="toggle-menu">
            <span>Menu</span>
            <div className="toggle-menu__lines"></div>
          </label>
          <ul className="header__menu">
            <li className="header__menuItem">
              <Link to="/developers?page=1">Developers</Link>
            </li>
            <li className="header__menuItem">
              <Link to="/projects">Projects</Link>
            </li>
            {UserService.isLoggedIn() && (
              <li className="header__menuItem">
                <Link to="/inbox">Inbox</Link>
              </li>
            )}
            {UserService.isLoggedIn() && (
              <li className="header__menuItem">
                <Link to={`/developers/${UserService.getUsername()}`}>
                  My Profile
                </Link>
              </li>
            )}
            {UserService.isLoggedIn() && (
              <li className="header__menuItem">
                <button
                  onClick={() => UserService.doLogout()}
                  className="btn btn--sub"
                >
                  Logout
                </button>
              </li>
            )}
            {!UserService.isLoggedIn() && (
              <li className="header__menuItem">
                <button
                  onClick={() => UserService.doLogin()}
                  className="btn btn--sub"
                >
                  Login / Sign Up
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
