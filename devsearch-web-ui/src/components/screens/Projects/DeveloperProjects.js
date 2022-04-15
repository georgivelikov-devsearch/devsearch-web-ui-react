import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectShort from "./ProjectShort";
import { Link } from "react-router-dom";

function DeveloperProjects({ projects, canEdit, developerData }) {
  return (
    <div>
      <div className="settings">
        <h3 className="settings__title">Projects</h3>
        {canEdit && (
          <Link
            className="tag tag--pill tag--sub settings__btn tag--lg"
            to={`/developers/${developerData.authorUsername}/project/new`}
            state={developerData}
          >
            <i className="im im-plus"></i> Add Project
          </Link>
        )}
      </div>
      <div class="projectInfo">
        <div class="grid grid--two">
          {projects &&
            projects.map((project) => (
              <div class="column">
                <ProjectShort
                  key={project.publicKey}
                  project={project}
                ></ProjectShort>
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
            ))}
        </div>
      </div>
    </div>
  );
}

export default DeveloperProjects;
