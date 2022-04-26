import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectShort from "./ProjectShort";
import { Link } from "react-router-dom";

function DeveloperProjects({ projects, canEdit, developerData }) {
  // const removeProjectFromList = (projectId) => {
  //   let projectsArray = [...projects];
  //   let searchIndex = -1;
  //   for (var i = 0; i < projects.length; i++) {
  //     if (projects[i].projectId === projectId) {
  //       searchIndex = i;
  //       break;
  //     }
  //   }

  //   projectsArray.splice(searchIndex, 1);
  //   setProjects(projectsArray);
  // };

  return (
    <div>
      <div className="settings">
        <h3 className="settings__title">Projects</h3>
        {canEdit && (
          <Link
            className="tag tag--pill tag--sub settings__btn tag--lg"
            to={`/developers/${developerData.authorUsername}/project/form`}
            state={{ developerData }}
          >
            <i className="im im-plus"></i> Add Project
          </Link>
        )}
      </div>
      <div className="projectInfo">
        <div className="grid grid--two">
          {projects &&
            projects.map((project) => (
              <div
                className="column project__maxheight"
                key={project.publicKey}
              >
                <ProjectShort
                  project={project}
                  developerData={developerData}
                  canEdit={canEdit}
                ></ProjectShort>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DeveloperProjects;
