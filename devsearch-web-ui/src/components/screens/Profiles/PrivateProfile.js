import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPrivateProfileForUser } from "../../../actions/profileActions";

import {
  PRIVATE_PROFILE_REQUEST,
  PRIVATE_PROFILE_SUCCESS,
  PRIVATE_PROFILE_FAIL,
} from "../../../constants/profileConstants";

import { AUTH_USER_ID } from "../../../constants/userConstants";

import Message from "../../common/Message";
import Loader from "../../common/Loader";
import { Link } from "react-router-dom";

function PrivateProfile() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const privateProfile = useSelector((state) => state.privateProfile);
  const { loading, error, profile } = privateProfile;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      const userId = userInfo[AUTH_USER_ID];
      dispatch(getPrivateProfileForUser(userId));
    }
  }, []);

  return (
    <main className="settingsPage profile my-md">
      {profile && (
        <div className="container">
          <div className="layout">
            <div className="column column--1of3">
              <div className="card text-center">
                <div className="card__body dev">
                  <Link
                    to="/profile/private/edit"
                    className="tag tag--pill tag--main settings__btn"
                  >
                    <i className="im im-edit"></i> Edit
                  </Link>
                  <img
                    className="avatar avatar--xl dev__avatar"
                    src="../../../images/user-default.png"
                  />
                  <h2 className="dev__name">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="dev__title">{profile.shortIntro}</p>
                  <p className="dev__location">
                    {profile.locationCity && profile.locationCountry ? (
                      <span>
                        Based in {profile.locationCity},{" "}
                        {profile.locationCountry}
                      </span>
                    ) : profile.locationCity ? (
                      <span>Based in {profile.locationCity}</span>
                    ) : profile.locationCountry ? (
                      <span>Based in {profile.locationCountry}</span>
                    ) : (
                      <span></span>
                    )}
                  </p>
                  <ul className="dev__social">
                    {profile.socialGithub && (
                      <li>
                        <a
                          title="Github"
                          href={profile.socialGithub}
                          target="_blank"
                        >
                          <i className="im im-github"></i>
                        </a>
                      </li>
                    )}
                    {profile.socialYoutube && (
                      <li>
                        <a
                          title="Youtube"
                          href={profile.socialYoutube}
                          target="_blank"
                        >
                          <i className="im im-youtube"></i>
                        </a>
                      </li>
                    )}
                    {profile.socialTwitter && (
                      <li>
                        <a
                          title="Twitter"
                          href={profile.socialTwitter}
                          target="_blank"
                        >
                          <i className="im im-twitter"></i>
                        </a>
                      </li>
                    )}
                    {profile.socialLinkedIn && (
                      <li>
                        <a
                          title="LinkedIn"
                          href={profile.socialLinkedIn}
                          target="_blank"
                        >
                          <i className="im im-linkedin"></i>
                        </a>
                      </li>
                    )}
                    {profile.socialWebsite && (
                      <li>
                        <a
                          title="Personal Website"
                          href={profile.socialWebsite}
                          target="_blank"
                        >
                          <i className="im im-globe"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                  <a href="#" className="btn btn--sub btn--lg">
                    Send Message{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="column column--2of3">
              <div className="devInfo">
                <h3 className="devInfo__title">About Me</h3>
                <p className="devInfo__about">{profile.about}</p>
              </div>
              <div className="settings">
                <h3 className="settings__title">Skills</h3>
                <a
                  className="tag tag--pill tag--sub settings__btn tag--lg"
                  href="#"
                >
                  <i className="im im-plus"></i> Add Skill
                </a>
              </div>

              <table className="settings__table">
                <tr>
                  <td className="settings__tableInfo">
                    <h4>JavaScript</h4>
                    <p>
                      Consectetur adipisicing elit. Natus nam dolore aut sed
                      vitae eos architecto unde tempore exercitationem
                      fugiat?...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="settings__tableInfo">
                    <h4>Python</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est, suscipit...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="settings__tableInfo">
                    <h4>Django</h4>
                    <p>
                      Amet consectetur adipisicing elit. Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Quod, odio Est,
                      suscipit...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </table>

              <div className="settings">
                <h3 className="settings__title">Projects</h3>
                <a
                  className="tag tag--pill tag--sub settings__btn tag--lg"
                  href="#"
                >
                  <i className="im im-plus"></i> Add Project
                </a>
              </div>

              <table className="settings__table">
                <tr>
                  <td className="settings__thumbnail">
                    <a href="single-project.html">
                      <img src="images/project-a.png" alt="Project Thumbnail" />
                    </a>
                  </td>
                  <td className="settings__tableInfo">
                    <a href="single-project.html">Yoga Studio Landing Page</a>
                    <p>
                      Consectetur adipisicing elit. Natus nam dolore aut sed
                      vitae eos architecto unde tempore exercitationem
                      fugiat?...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="settings__thumbnail">
                    <a href="single-project.html">
                      <img src="images/project-b.png" alt="Project Thumbnail" />
                    </a>
                  </td>
                  <td className="settings__tableInfo">
                    <a href="single-project.html">
                      DevSearch Website UI Design
                    </a>
                    <p>
                      Consectetur adipisicing elit. Natus nam dolore aut sed
                      vitae eos architecto unde tempore exercitationem
                      fugiat?...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="settings__thumbnail">
                    <a href="single-project.html">
                      <img src="images/project-a.png" alt="Project Thumbnail" />
                    </a>
                  </td>
                  <td className="settings__tableInfo">
                    <a href="single-project.html">Portfolio Website Design</a>
                    <p>
                      Consectetur adipisicing elit. Natus nam dolore aut sed
                      vitae eos architecto unde tempore exercitationem
                      fugiat?...
                    </p>
                  </td>
                  <td className="settings__tableActions">
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-edit"></i> Edit
                    </a>
                    <a
                      className="tag tag--pill tag--main settings__btn"
                      href="#"
                    >
                      <i className="im im-x-mark-circle-o"></i>
                      Delete
                    </a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      )}
      {error && (
        <Message
          variant="alert alert--error"
          variantStyle={{
            width: "100%",
            display: "inline-block",
            textAlign: "center",
          }}
          message={error.message}
        />
      )}
      {loading && <Loader />}
    </main>
  );
}

export default PrivateProfile;
