import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPublicProfileList } from "../../../actions/profileActions";

import { AUTH_USER_ID } from "../../../constants/userConstants";

import PublicProfileShort from "./PublicProfileShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import Paging from "../Home/Paging";

function PublicProfileList() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const publicProfileList = useSelector((state) => state.publicProfileList);
  const { error, profiles } = publicProfileList;

  const dispatch = useDispatch();

  useEffect(() => {
    let userId = null;
    if (userInfo) {
      userId = userInfo[AUTH_USER_ID];
    }

    dispatch(getPublicProfileList(userId));
  }, [dispatch]);

  return (
    <section class="devlist">
      <div class="container">
        {profiles ? (
          <div class="grid grid--three">
            {" "}
            {profiles.map((profile) => (
              <PublicProfileShort profile={profile} />
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
      <Paging />
    </section>
  );
}

export default PublicProfileList;