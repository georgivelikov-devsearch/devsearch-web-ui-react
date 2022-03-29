import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDeveloper } from "../../../actions/developerActions";
import UserService from "../../../services/identity/keycloak/keycloakUserService";
import Developer from "./Developer";

function DeveloperPrivate() {
  const developerState = useSelector((state) => state.developer);
  const { loading, error, developer } = developerState;

  const dispatch = useDispatch();

  useEffect(() => {
    if (UserService.isLoggedIn()) {
      let username = UserService.getUsername();
      dispatch(getDeveloper(username));
    } else {
      UserService.doLogin();
    }
  }, [dispatch]);

  return (
    <Developer
      loading={loading}
      error={error}
      developer={developer}
      canSendMessage={false}
      canEdit={true}
    />
  );
}

export default DeveloperPrivate;