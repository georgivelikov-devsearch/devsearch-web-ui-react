import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProject } from "../../../services/project/projectService";
import { useDispatch } from "react-redux";

function ProjectShort({ project, developerData, canEdit }) {
  const dispatch = useDispatch();
  const [projectTags, setProjectTags] = useState([]);

  useEffect(() => {
    let tagsForSort = [...project.tags];
    tagsForSort.sort((a, b) => a.position - b.position);
    setProjectTags(tagsForSort);
  }, [project]);

  const deleteProjectHandler = (projectId) => {
    dispatch(deleteProject(projectId));
  };

  return (
    <div className="column card">
      <Link to="/" className="project full_width">
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
            {projectTags.map((tag) => (
              <span key={tag.publicKey} className="tag tag--pill tag--main">
                <small>{tag.name}</small>
              </span>
            ))}
          </div>
        </div>
      </Link>
      {canEdit && (
        <div className="project_buttons">
          <Link
            className="tag tag--pill tag--sub settings__btn tag--lg"
            to={`/developers/${developerData.authorUsername}/project/form`}
            state={{ project, developerData }}
          >
            <i className="im"></i> Edit
          </Link>
          <div
            className="tag tag--pill tag--sub settings__btn tag--lg project__floatright"
            onClick={() => deleteProjectHandler(project.projectId)}
          >
            <i className="im"></i> Delete{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectShort;
