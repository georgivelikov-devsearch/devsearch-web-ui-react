import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../../../services/project/projectService";
import { Link } from "react-router-dom";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

function Project() {
  const dispatch = useDispatch();
  const { projectName } = useParams();
  const { loading } = useSelector((state) => state.loading);
  const { project } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(getSingleProject(projectName));
  }, []);

  return (
    <main className="singleProject my-md">
      {project && (
        <div className="container">
          <div className="layout">
            <div className="column column--1of3">
              <h3 className="singleProject__subtitle">Tools & Stacks</h3>
              <div className="singleProject__toolStack">
                {project.tags &&
                  project.tags.map((tag) => (
                    <span
                      key={tag.publicKey}
                      className="tag tag--pill tag--main"
                    >
                      <small>{tag.name}</small>
                    </span>
                  ))}
              </div>
              {project.sourceCode && (
                <a
                  className="singleProject__liveLink"
                  href={
                    project.sourceCode.startsWith("https://")
                      ? project.sourceCode
                      : "https://" + project.sourceCode
                  }
                  target="_blank"
                >
                  <i class="im im-external-link"></i>Source Code
                </a>
              )}
            </div>
            <div className="column column--2of3">
              <img
                className="singleProject__preview"
                src={
                  project.projectPictureUrl
                    ? project.projectPictureUrl
                    : "../../../images/project-default.jpg"
                }
                alt="portfolio thumbnail"
              />
              <Link
                to={`/developers/${project.authorUsername}`}
                className="singleProject__developer"
              >
                {project.authorFullname}
              </Link>
              <h2 className="singleProject__title">{project.projectName}</h2>
              <h3 className="singleProject__subtitle">About the Project</h3>
              <div className="singleProject__info">{project.about}</div>

              <div className="comments">
                <h3 className="singleProject__subtitle">Feedback</h3>
                <h5 className="project--rating">
                  36% Postitive Feedback (18 Votes)
                </h5>

                <form className="form" action="#" method="POST">
                  <div className="form__field">
                    <label htmlFor="formInput#textarea">Comments: </label>
                    <textarea
                      className="input input--textarea"
                      name="message"
                      id="formInput#textarea"
                      placeholder="Write your comments here..."
                    ></textarea>
                  </div>
                  <input
                    className="btn btn--sub btn--lg"
                    type="submit"
                    value="Comments"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </main>
  );
}

export default Project;
