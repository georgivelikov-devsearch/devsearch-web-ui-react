import React from "react";

function Message({ variant, variantStyle, message }) {
  return (
    <div className={variant} style={variantStyle}>
      {message}
    </div>
  );
}

export default Message;
