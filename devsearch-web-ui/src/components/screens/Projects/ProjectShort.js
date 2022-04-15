import React from "react";
import { Link } from "react-router-dom";

function ProjectShort({ project, developerData, canEdit }) {
  return (
    <div>
      <div className="card project">
        <div className="project">
          <img
            className="project__thumbnail"
            src={
              project.projectPictureUrl
                ? project.projectPictureUrl
                : "../../../images/project-default.jpg"
            }
            alt="project thumbnail"
          />
          <div className="card__body">
            <h3 className="project__title">{project.projectName}</h3>
            <p>
              <a className="project__author" href="profile.html">
                {project.authorFullname}
              </a>
            </p>
            <p className="project--rating">
              <span className="project__bold">92%</span> Postitive Feedback (62
              Votes)
            </p>
            <div className="project__tags">
              {project.tags.map((tag) => (
                <span className="tag tag--pill tag--main">
                  <small>{tag.name}</small>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {canEdit && (
        <div className="project_buttons">
          <Link
            className="tag tag--pill tag--sub settings__btn tag--lg"
            to={`/developers/${developerData.authorUsername}/project/edit`}
            state={developerData}
          >
            <i className="im"></i> Edit
          </Link>
          <div className="tag tag--pill tag--sub settings__btn tag--lg project__floatright">
            <i className="im"></i> Delete{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectShort;
