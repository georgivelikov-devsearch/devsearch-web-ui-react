import React from "react";
import { Link } from "react-router-dom";
function PublicProfileShort({ profile }) {
  return (
    <div className="column card">
      <div className="dev">
        <Link
          to={
            profile.sender
              ? "/profile/private"
              : `/profile/public/${profile.profilePublicId}`
          }
          className="card__body"
        >
          <div className="dev__profile">
            <img
              className="avatar avatar--md"
              src={
                profile.profilePictureUrl
                  ? profile.profilePictureUrl
                  : "../../../images/user-default.png"
              }
              alt=""
            />
            <div className="dev__meta">
              <h3>
                {profile.firstName} {profile.lastName}
              </h3>
              <h5>{profile.shortIntro}</h5>
            </div>
          </div>
          <p className="dev__info">{profile.about}</p>
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

export default PublicProfileShort;
