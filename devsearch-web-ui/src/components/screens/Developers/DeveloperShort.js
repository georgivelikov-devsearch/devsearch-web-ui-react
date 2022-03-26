import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../../services/identity/keycloak/keycloakUserService";

function DeveloperShort({ developer }) {
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      if (UserService.getUsername() === developer.username) {
        setIsOwnProfile(true);
      }
    }
  }, [developer.username]);

  return (
    <div className="column card">
      <div className="dev">
        <Link
          to={
            isOwnProfile
              ? `/developers/${developer.username}`
              : `/developers/public/${developer.username}`
          }
          className="card__body"
        >
          <div className="dev__developer">
            <img
              className="avatar avatar--md"
              src={
                developer.developerPictureUrl
                  ? developer.developerPictureUrl
                  : "../../../images/user-default.png"
              }
              alt=""
            />
            <div className="dev__meta">
              <h3>
                {developer.firstName} {developer.lastName}
              </h3>
              <p className="dev__username">({developer.username})</p>
              <h5>{developer.shortIntro}</h5>
            </div>
          </div>
          <p className="dev__info">{developer.about}</p>
          <div className="dev__skills">
            <span className="tag tag--pill tag--main">
              <small>JavaScript</small>
            </span>
            <span className="tag tag--pill tag--main">
              <small>React</small>
            </span>
            <span className="tag tag--pill tag--main">
              <small>SCSS</small>
            </span>
            <span className="tag tag--pill tag--main">
              <small>Nodejs</small>
            </span>
            <span className="tag tag--pill tag--main">
              <small>Express</small>
            </span>
            <span className="tag tag--pill tag--main">
              <small>GraphQL</small>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DeveloperShort;
