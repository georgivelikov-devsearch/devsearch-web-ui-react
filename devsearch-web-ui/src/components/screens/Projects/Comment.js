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
        <div className="star_float_left">
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
        <p className="comment__info">{comment.commentText}</p>
      </div>
    </div>
  );
}

export default Comment;
