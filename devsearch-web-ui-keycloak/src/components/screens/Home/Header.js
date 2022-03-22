import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { login, logout } from "../../../actions/userActions";
import UserService from "../../../services/identity/keycloakUserService";
import Keycloak from "keycloak-js";
import { useKeycloak } from "@react-keycloak/web";

import { Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();

  const { keycloak, initialized } = useKeycloak();

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
            {initialized && keycloak.authenticated && (
              <li className="header__menuItem">
                <Link to="/inbox">Inbox</Link>
              </li>
            )}
            {initialized && keycloak.authenticated && (
              <li className="header__menuItem">
                <Link to="/profile/private">My Profile</Link>
              </li>
            )}
            {initialized && keycloak.authenticated && (
              <li className="header__menuItem">
                <button
                  onClick={() => keycloak.logout()}
                  className="btn btn--sub"
                >
                  Logout
                </button>
              </li>
            )}

            {initialized && !keycloak.authenticated && (
              <li className="header__menuItem">
                <button
                  onClick={() => keycloak.login()}
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
