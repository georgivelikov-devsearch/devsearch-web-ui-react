import React from "react";

function Comment({ comment }) {
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
      <div className="comment__details">
        <div className="comment__author">{comment.authorFullname}</div>
        <p className="comment__info">{comment.commentText}</p>
      </div>
    </div>
  );
}

export default Comment;
