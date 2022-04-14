import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function DeveloperProjects({ projects }) {
  return (
    <div class="devInfo">
      <div class="grid grid--two">
        {projects.map((project) => (
          <div class="column">
            <div class="card project">
              <a href="single-project.html" class="project">
                <img
                  class="project__thumbnail"
                  src="images/project-b.png"
                  alt="project thumbnail"
                />
                <div class="card__body">
                  <h3 class="project__title">{project.projectName}</h3>
                  <p>
                    <a class="project__author" href="profile.html">
                      {project.authorFullname}
                    </a>
                  </p>
                  <p class="project--rating">
                    <span style="font-weight: bold;">92%</span> Postitive
                    Feedback (62 Votes)
                  </p>
                  <div class="project__tags">
                    {project.tags.map((tag) => (
                      <span class="tag tag--pill tag--main">
                        <small>{tag.name}</small>
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperProjects;
