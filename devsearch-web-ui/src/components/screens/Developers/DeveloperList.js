import React from "react";

import PublicDeveloperShort from "./DeveloperShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

function DeveloperList({ developers, error }) {
  return (
    <div className="devlist">
      <div className="container">
        {developers ? (
          <div className="grid grid--three">
            {" "}
            {developers.map((developer) => (
              <PublicDeveloperShort
                key={developer.publicKey}
                developer={developer}
              />
            ))}
          </div>
        ) : error ? (
          <Message
            variant="alert alert--error"
            variantStyle={{
              width: "100%",
              display: "inline-block",
              textAlign: "center",
            }}
            message={error.message}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default DeveloperList;
