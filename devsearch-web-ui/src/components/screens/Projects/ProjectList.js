import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectShort from "./ProjectShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

function ProjectList({ projects, projectListError }) {
  return (
    <div className="projectsList">
      <div className="container">
        {projects ? (
          <div className="grid grid--three column">
            {" "}
            {projects.map((project) => (
              <ProjectShort key={project.publicKey} project={project} />
            ))}
          </div>
        ) : projectListError ? (
          <Message
            variant="alert alert--error"
            variantStyle={{
              width: "100%",
              display: "inline-block",
              textAlign: "center",
            }}
            message={projectListError.message}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default ProjectList;
