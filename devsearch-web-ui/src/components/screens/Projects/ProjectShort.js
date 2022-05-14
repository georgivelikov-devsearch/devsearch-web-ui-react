import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { deleteProject } from "../../../services/project/projectService";

import { Link } from "react-router-dom";

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

  // const calculateRating = (project) => {
  //   console.log(project);
  //   if (!project.comments || project.comments.length === 0) {
  //     return "There is no feedback yet.";
  //   }

  //   let totalCount = project.comments.length;
  //   let totalRating = 0;

  //   project.comments.forEach((c) => {
  //     totalRating += c.rating;
  //   });

  //   let averageRating = totalRating / totalCount;
  //   let returnVal = `Project Rating: ${averageRating.toFixed(
  //     2
  //   )} (${totalCount} Votes)`;

  //   if (totalCount === 1) {
  //     returnVal = `Rroject Rating: ${averageRating.toFixed(
  //       2
  //     )} (${totalCount} Vote)`;
  //   }

  //   return returnVal;
  // };

  return (
    <div className="column card">
      <Link
        to={`/developers/${project.authorUsername}/${project.projectName}`}
        className="project full_width project__hover"
      >
        <img
          className="project__thumbnail"
          src={
            project.projectPictureUrl
              ? project.projectPictureUrl
              : "../../../images/project-default.jpg"
          }
          alt="project thumbnail"
        />
      </Link>
      <div className="card__body">
        <Link
          to={`/developers/${project.authorUsername}/${project.projectName}`}
          className="project full_width project__hover"
        >
          <h3 className="project__title">{project.projectName}</h3>
        </Link>
        <p>
          <Link
            to={`/developers/${project.authorUsername}`}
            className="project__author"
          >
            {project.authorFullname}
          </Link>
        </p>
        {/* <p className="project--rating">{calculateRating(project)}</p> */}
        <div className="project__tags">
          {projectTags.map((tag) => (
            <span key={tag.publicKey} className="tag tag--pill tag--main">
              <small>{tag.name}</small>
            </span>
          ))}
        </div>
      </div>
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
