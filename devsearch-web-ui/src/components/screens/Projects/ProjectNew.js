import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../common/Message";
import Loader from "../../common/Loader";

import UserService from "../../../services/identity/keycloak/keycloakUserService";

function ProjectNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      UserService.doLogin();
    }
  }, [dispatch, navigate]);

  return (
    <div className="projectnew">
      <div className="card">
        <div className="projectnew__header text-center">
          <h3>Add Project</h3>
          <p>Create new project</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectNew;
