import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  getDeveloperList,
  updateSearchForPublicDeveloperList,
} from "../../../actions/developerActions";

import PublicDeveloperShort from "./DeveloperShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import Paging from "../Home/Paging";

function DeveloperList({ developers, error }) {
  return (
    <div class="devlist">
      <div class="container">
        {developers ? (
          <div class="grid grid--three">
            {" "}
            {developers.map((developer) => (
              <PublicDeveloperShort
                key={developer.developerId}
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
