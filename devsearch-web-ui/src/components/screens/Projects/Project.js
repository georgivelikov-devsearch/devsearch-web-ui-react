import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserService from "../../../services/identity/keycloak/keycloakUserService";
import { getSingleProject } from "../../../services/project/projectService";
import {
  addComment,
  removeComment,
} from "../../../services/developer/developerService";

import { Link } from "react-router-dom";
import StarRating from "../../common/StarRating";
import Loader from "../../common/Loader";
import Comment from "./Comment";

function Project() {
  const dispatch = useDispatch();
  const commentTextRef = useRef(null);
  const starRatingRef = useRef(null);

  const { projectName } = useParams();
  const { loading } = useSelector((state) => state.loading);
  const { project } = useSelector((state) => state.project);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  // Comment section
  const [loggedInUsername, setLoggedInUsername] = useState("");

  useEffect(() => {
    // needed for delete functionality in Comment
    if (UserService.isLoggedIn()) {
      setLoggedInUsername(UserService.getUsername());
    } else {
      setLoggedInUsername("");
    }

    dispatch(getSingleProject(projectName));
  }, []);

  const addCommentHandler = (e) => {
    e.preventDefault();
    console.log("Rating: " + rating);
    const newComment = {
      commentText,
      projectId: project.projectId,
      rating,
    };

    dispatch(addComment(newComment));
    commentTextRef.current.value = "";
    starRatingRef.current();
  };

  const removeCommentHandler = (commentId) => {
    dispatch(removeComment(commentId));
  };

  const calculateRating = (project) => {
    if (project.comments.length === 0) {
      return "There is no feedback yet. Be the first to comment";
    }

    let totalCount = project.comments.length;
    let totalRating = 0;

    project.comments.forEach((c) => {
      totalRating += c.rating;
    });

    let averageRating = totalRating / totalCount;
    let returnVal = `Project Rating: ${averageRating.toFixed(
      2
    )} (${totalCount} Votes)`;

    if (totalCount === 1) {
      returnVal = `Rroject Rating: ${averageRating.toFixed(
        2
      )} (${totalCount} Vote)`;
    }

    return returnVal;
  };

  // canAddComment is true if user is logged in or haven't commented the project yet
  const canAddComment = (project) => {
    let username = "";
    if (UserService.isLoggedIn()) {
      username = UserService.getUsername();
    } else {
      return false;
    }

    for (var i = 0; i < project.comments.length; i++) {
      if (project.comments[i].author === username) {
        // project already commented
        return false;
      }
    }

    return true;
  };

  return (
    <main className="singleProject my-md">
      {project && (
        <div className="container">
          <div className="layout">
            <div className="column column--1of3">
              <h3 className="singleProject__subtitle">Tools & Stacks</h3>
              <div className="singleProject__toolStack">
                {project.tags &&
                  project.tags.map((tag) => (
                    <span
                      key={tag.publicKey}
                      className="tag tag--pill tag--main"
                    >
                      <small>{tag.name}</small>
                    </span>
                  ))}
              </div>
              {project.sourceCode && (
                <a
                  className="singleProject__liveLink"
                  href={
                    project.sourceCode.startsWith("https://")
                      ? project.sourceCode
                      : "https://" + project.sourceCode
                  }
                  target="_blank"
                >
                  <i className="im im-external-link"></i>Source Code
                </a>
              )}
            </div>
            <div className="column column--2of3">
              <img
                className="singleProject__preview"
                src={
                  project.projectPictureUrl
                    ? project.projectPictureUrl
                    : "../../../images/project-default.jpg"
                }
                alt="portfolio thumbnail"
              />
              <Link
                to={`/developers/${project.authorUsername}`}
                className="singleProject__developer"
              >
                {project.authorFullname}
              </Link>
              <h2 className="singleProject__title">{project.projectName}</h2>
              <h3 className="singleProject__subtitle">About the Project</h3>
              <div className="singleProject__info">{project.about}</div>

              <div className="comments">
                <h3 className="singleProject__subtitle">Feedback</h3>
                <h5 className="project--rating">{calculateRating(project)}</h5>
                {canAddComment(project) && (
                  <div>
                    <StarRating
                      defaultRating={5}
                      propagateRating={setRating}
                      starRatingRef={starRatingRef}
                    />

                    <form
                      onSubmit={addCommentHandler}
                      className="form"
                      action="#"
                      method="POST"
                    >
                      <div className="form__field">
                        <label htmlFor="formInput#textarea">Comments: </label>
                        <textarea
                          className="input input--textarea"
                          name="message"
                          id="formInput#textarea"
                          placeholder="Write your comments here..."
                          ref={commentTextRef}
                          onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                      </div>
                      <input
                        className="btn btn--sub btn--lg"
                        type="submit"
                        value="Comment"
                      />
                    </form>
                  </div>
                )}
                <div className="commentList">
                  {project.comments &&
                    project.comments.map((c) => (
                      <Comment
                        key={c.publicKey}
                        comment={c}
                        removeComment={removeCommentHandler}
                        loggedInUsername={loggedInUsername}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && <Loader />}
    </main>
  );
}

export default Project;
