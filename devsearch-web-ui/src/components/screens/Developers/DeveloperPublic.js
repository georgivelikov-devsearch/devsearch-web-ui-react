import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { getPublicDeveloper } from "../../../actions/developerActions_2";

import UserService from "../../../services/identity/keycloak/keycloakUserService";
import Developer from "./Developer";

import { NAVIGATE_TO_PROFILE } from "../../../constants/developerConstants";

function DeveloperPublic() {
  const { username } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const [canSendMessage, setCanSendMessage] = useState(false);
  const publicDeveloperState = useSelector((state) => state.developerPublic);
  const { loading, error, publicDeveloper } = publicDeveloperState;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      if (username === UserService.getUsername()) {
        //setCanEdit(true);
        navigate(NAVIGATE_TO_PROFILE(username));
      }

      setCanSendMessage(true);
    }

    dispatch(getPublicDeveloper(username));
  }, [dispatch, username]);

  return (
    <Developer
      loading={loading}
      error={error}
      developer={publicDeveloper}
      canSendMessage={canSendMessage}
      canEdit={canEdit}
    />
  );
}

export default DeveloperPublic;
