import React from "react";

import { Link } from "react-router-dom";
import ProjectShort from "./ProjectShort";

function DeveloperProjects({ projects, canEdit, developerData }) {
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
