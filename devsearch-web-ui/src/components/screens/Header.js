import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="container container--narrow">
        <Link className="header__logo" to="/">
          <img src="images/logo.svg" alt="DevSearch Logo" />
        </Link>
        <nav className="header__nav">
          <input type="checkbox" id="responsive-menu" />
          <label htmlFor="responsive-menu" className="toggle-menu">
            <span>Menu</span>
            <div className="toggle-menu__lines"></div>
          </label>
          <ul className="header__menu">
            <li className="header__menuItem">
              <Link to="/developers">Developers</Link>
            </li>
            <li className="header__menuItem">
              <Link to="/projects">Projects</Link>
            </li>
            <li className="header__menuItem">
              <Link to="/inbox">Inbox</Link>
            </li>
            <li className="header__menuItem">
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="header__menuItem">
              <Link to="/login" className="btn btn--sub">
                Login / Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
