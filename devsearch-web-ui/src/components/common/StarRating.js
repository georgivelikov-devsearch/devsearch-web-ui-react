import React from "react";
import { useState, useEffect } from "react";

function StarRating({ defaultRating, propagateRating, starRatingRef }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    starRatingRef.current = setDefaultRating;
    setDefaultRating();
  }, []);

  const setDefaultRating = () => {
    setHover(defaultRating);
    setRating(defaultRating);
    propagateRating(defaultRating);
  };

  const handleRating = (val) => {
    setRating(val);
    propagateRating(val);
  };

  const handleHover = (val) => {
    setHover(val);
  };

  return (
    <div className="star_rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button type="button" key={index} onClick={() => handleRating(index)}>
            <span
              className={
                index <= (hover || rating)
                  ? "star_rating_on star_size_large"
                  : "star_rating_off star_size_large"
              }
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(rating)}
            >
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;
