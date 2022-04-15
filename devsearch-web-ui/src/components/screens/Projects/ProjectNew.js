import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../common/Message";
import Loader from "../../common/Loader";

import UserService from "../../../services/identity/keycloak/keycloakUserService";

import { validateStringLength } from "../../../utils/validator";
import { getBase64FromFile } from "../../../utils/utils";
import { PROJECT_VALIDATION } from "../../../constants/projectConstants";
import { NAVIGATE_TO_PROFILE } from "../../../constants/developerConstants";

import { addProject } from "../../../services/project/projectService";

function ProjectNew() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { developerId, authorUsername, authorFullname } = location.state;
  const { loading } = useSelector((state) => state.loading);
  const { projectNewError } = useSelector((state) => state.project);

  const [projectName, setProjectName] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  const [about, setAbout] = useState({
    value: "",
    isValid: true,
    errorMessage: "",
  });

  const [sourceCode, setSourceCode] = useState("");

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      UserService.doLogin();
    }
  }, [dispatch, navigate]);

  const goBack = () => {
    navigate(NAVIGATE_TO_PROFILE(UserService.getUsername()));
  };

  const clearValidation = () => {
    setProjectName({
      value: projectName.value,
      isValid: true,
      errorMessage: "",
    });

    setAbout({
      value: about.value,
      isValid: true,
      errorMessage: "",
    });
  };

  const validateFields = () => {
    let isValid = validateStringLength(
      projectName.value,
      PROJECT_VALIDATION.PROJECTNAME_MIN_LENGTH,
      PROJECT_VALIDATION.PROJECTNAME_MAX_LENGTH,
      "Project Name"
    );
    if (!isValid.result) {
      setProjectName({
        value: projectName.value,
        isValid: isValid.result,
        errorMessage: isValid.message,
      });
      return false;
    }

    isValid = validateStringLength(
      about.value,
      PROJECT_VALIDATION.NO_MIN_LENGTH,
      PROJECT_VALIDATION.ABOUT_MAX_LENGTH,
      "About"
    );
    if (!isValid.result) {
      setAbout({
        value: about.value,
        isValid: isValid.result,
        errorMessage: isValid.message,
      });
      return false;
    }

    return true;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    clearValidation();
    let isValid = validateFields();

    if (!isValid) {
      return;
    }

    const newData = {
      developerId,
      authorUsername,
      authorFullname,
      projectName: projectName.value,
      about: about.value,
      sourceCode,
    };

    dispatch(addProject(newData, navigate));
  };

  return (
    <div className="projectnew">
      <div className="card">
        <div className="projectnew__header text-center">
          <h3>Add Project</h3>
          <p>Create new project</p>
        </div>
        {loading && <Loader />}
        {projectNewError && (
          <Message
            variant="alert alert--error"
            variantStyle={{
              width: "100%",
              display: "inline-block",
              textAlign: "center",
            }}
            message={projectNewError.message}
          />
        )}
        <form
          action="#"
          className="form projectnew__form"
          onSubmit={submitHandler}
        >
          <div className="form__field">
            <label htmlFor="formInput#text">Project Name: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="Project Name"
              onChange={(e) =>
                setProjectName({ ...projectName, value: e.target.value })
              }
            />
          </div>
          {!projectName.isValid && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={projectName.errorMessage}
            />
          )}
          <div className="form__field">
            <label htmlFor="formInput#textarea">About: </label>
            <textarea
              className="input input--textarea"
              id="formInput#textarea"
              type="textarea"
              name="text"
              placeholder="About"
              onChange={(e) => setAbout({ ...about, value: e.target.value })}
            />
          </div>
          {!about.isValid && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={about.errorMessage}
            />
          )}
          <div className="form__field">
            <label htmlFor="formInput#text">Source Code: </label>
            <input
              className="input input--text"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="Source Code"
              onChange={(e) => setSourceCode(e.target.value)}
            />
          </div>
          <div className="projectnew__actions">
            <input className="btn btn--sub btn--lg" type="submit" value="Add" />
            <input
              className="btn btn--sub btn--lg"
              type="button"
              value="Cancel"
              onClick={goBack}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectNew;
