// User login and registration
export const LOGIN_URL = "http://localhost:8080/users/login";
export const REGISTER_URL = "http://localhost:8080/users";

// Profile
export const PRIVATE_PROFILE_URL = (userId) => {
  return `http://localhost:8080/profiles/user/${userId}`;
};
export const EDIT_PRIVATE_PROFILE_URL = "http://localhost:8080/profiles";
export const PUBLIC_PROFILE_URL = (profilePublicId) => {
  return `http://localhost:8080/profiles/public/${profilePublicId}`;
};
export const PUBLIC_PROFILE_LIST_URL = "http://localhost:8080/profiles/public";
