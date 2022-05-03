import React from "react";
import UserService from "../../../services/identity/keycloak/keycloakUserService";

function Comment({ comment, removeComment, loggedInUsername }) {
  const deleteCommentHandler = (commentId) => {
    removeComment(commentId);
  };

  return (
    <div className="comment">
      <div>
        <img
          className="avatar avatar--md"
          src={
            comment.authorPictureUrl
              ? comment.authorPictureUrl
              : "../../../images/user-default.png"
          }
          alt="user"
        />
      </div>
      <div className="comment__details comment_display_block">
        <div className="star_float_left comment_display_block">
          <div className="comment__author">{comment.authorFullname}</div>
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <div key={index}>
                {index <= comment.rating ? (
                  <span className="star_rating_on star_size_small star_float_left">
                    &#9733;
                  </span>
                ) : (
                  <span className="star_rating_off star_size_small star_float_left">
                    &#9733;
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <p className="comment__info comment_display_block">
          {comment.commentText}
        </p>
        {comment.author === loggedInUsername && (
          <div
            className="tag tag--pill tag--main settings__btn delete_button_float_right"
            onClick={() => deleteCommentHandler(comment.commentId)}
          >
            <i className="im im-x-mark-circle-o"></i>
            Delete
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
