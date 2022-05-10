import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import UserService from "../../../services/identity/keycloak/keycloakUserService";
import {
  getDeveloper,
  getPublicDeveloper,
} from "../../../services/developer/developerService";

import { Link } from "react-router-dom";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import Skills from "./Skills";
import DeveloperProjects from "../Projects/DeveloperProjects";

function Developer() {
  const dispatch = useDispatch();
  const { username } = useParams();

  const { developer } = useSelector((state) => state.developer);
  const { developerError } = useSelector((state) => state.developerError);
  const { loading } = useSelector((state) => state.loading);

  const [canEdit, setCanEdit] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(false);

  useEffect(() => {
    console.log("In Developer");
    if (UserService.isLoggedIn()) {
      if (username === UserService.getUsername()) {
        setCanEdit(true);
        setCanSendMessage(false);
        dispatch(getDeveloper(username));
      } else {
        setCanEdit(false);
        setCanSendMessage(true);
        dispatch(getPublicDeveloper(username));
      }
    } else {
      setCanEdit(false);
      setCanSendMessage(false);
      dispatch(getPublicDeveloper(username));
    }
  }, [dispatch, username]);

  return (
    <main className="settingsPage developer my-md">
      {developer && (
        <div className="container">
          <div className="layout">
            <div className="column column--1of3">
              <div className="card text-center">
                <div className="card__body dev">
                  {canEdit && (
                    <Link
                      to={`/developers/${developer.username}/edit`}
                      className="tag tag--pill tag--main settings__btn"
                    >
                      <i className="im im-edit"></i> Edit
                    </Link>
                  )}
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
                  {canSendMessage && (
                    <a href="#" className="btn btn--sub btn--lg">
                      Send Message
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="column column--2of3">
              <div className="devInfo">
                <h3 className="devInfo__title">About Me</h3>
                <p className="devInfo__about">{developer.about}</p>
              </div>
              <Skills developer={developer} canEdit={canEdit} />
              <DeveloperProjects
                projects={developer.projects}
                canEdit={canEdit}
                developerData={{
                  developerId: developer.developerId,
                  authorUsername: developer.username,
                  authorFullname:
                    developer.firstName + " " + developer.lastName,
                }}
              />
            </div>
          </div>
        </div>
      )}
      {developerError && (
        <Message
          variant="alert alert--error"
          variantStyle={{
            width: "100%",
            display: "inline-block",
            textAlign: "center",
          }}
          message={developerError.message}
        />
      )}
      {loading && <Loader />}
    </main>
  );
}

export default Developer;
