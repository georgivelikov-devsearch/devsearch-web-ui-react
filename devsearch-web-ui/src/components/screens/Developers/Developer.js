import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import { getDeveloper } from "../../../actions/developerActions";
import UserService from "../../../services/identity/keycloak/keycloakUserService";

function Developer() {
  const developerState = useSelector((state) => state.developer);
  const { loading, error, developer } = developerState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      UserService.doLogin();
      console.log("Not logged in!");
    }

    let username = UserService.getUsername();
    dispatch(getDeveloper(username));
  }, []);

  return (
    <main className="settingsPage developer my-md">
      {developer && (
        <div className="container">
          <div className="layout">
            <div className="column column--1of3">
              <div className="card text-center">
                <div className="card__body dev">
                  <Link
                    to="/developer/private/edit"
                    className="tag tag--pill tag--main settings__btn"
                  >
                    <i className="im im-edit"></i> Edit
                  </Link>
                  <img
                    className="avatar avatar--xl dev__avatar"
                    src={
                      developer.developerPictureUrl
                        ? developer.developerPictureUrl
                        : "../../../images/user-default.png"
                    }
                  />
                  <h2 className="dev__name">
                    {developer.firstName} {developer.lastName}
                  </h2>
                  <p className="dev__username">({developer.username})</p>
                  <p className="dev__title">{developer.shortIntro}</p>
                  <p className="dev__location">
                    {developer.locationCity && developer.locationCountry ? (
                      <span>
                        Based in {developer.locationCity},{" "}
                        {developer.locationCountry}
                      </span>
                    ) : developer.locationCity ? (
                      <span>Based in {developer.locationCity}</span>
                    ) : developer.locationCountry ? (
                      <span>Based in {developer.locationCountry}</span>
                    ) : (
                      <span></span>
                    )}
                  </p>
                  <ul className="dev__social">
                    {developer.socialGithub && (
                      <li>
                        <a
                          title="Github"
                          href={
                            developer.socialGithub.startsWith("https://")
                              ? developer.socialGithub
                              : "https://" + developer.socialGithub
                          }
                          target="_blank"
                        >
                          <i className="im im-github"></i>
                        </a>
                      </li>
                    )}
                    {developer.socialYoutube && (
                      <li>
                        <a
                          title="Youtube"
                          href={
                            developer.socialYoutube.startsWith("https://")
                              ? developer.socialYoutube
                              : "https://" + developer.socialYoutube
                          }
                          target="_blank"
                        >
                          <i className="im im-youtube"></i>
                        </a>
                      </li>
                    )}
                    {developer.socialTwitter && (
                      <li>
                        <a
                          title="Twitter"
                          href={
                            developer.socialTwitter.startsWith("https://")
                              ? developer.socialTwitter
                              : "https://" + developer.socialTwitter
                          }
                          target="_blank"
                        >
                          <i className="im im-twitter"></i>
                        </a>
                      </li>
                    )}
                    {developer.socialLinkedIn && (
                      <li>
                        <a
                          title="LinkedIn"
                          href={
                            developer.socialLinkedIn.startsWith("https://")
                              ? developer.socialLinkedIn
                              : "https://" + developer.socialLinkedIn
                          }
                          target="_blank"
                        >
                          <i className="im im-linkedin"></i>
                        </a>
                      </li>
                    )}
                    {developer.socialWebsite && (
                      <li>
                        <a
                          title="Personal Website"
                          href={developer.socialWebsite}
                          target="_blank"
                        >
                          <i className="im im-globe"></i>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="column column--2of3">
              <div className="devInfo">
                <h3 className="devInfo__title">About Me</h3>
                <p className="devInfo__about">{developer.about}</p>
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

export default Developer;
