import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getPrivateProfileForUser,
  editPrivateProfileForUser,
} from "../../../actions/profileActions";

import { validateStringLength } from "../../../utils/validator";
import { PROFILE_VALIDATION } from "../../../constants/profileConstants";

import HomeIcon from "../../common/HomeIcon";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

import { AUTH_USER_ID } from "../../../constants/userConstants";

function PrivateProfileEdit() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [about, setAbout] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationCountry, setLocationCountry] = useState("");
  const [socialGithub, setSocialGithub] = useState("");
  const [socialYoutube, setSocialYoutube] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [socialLinkedIn, setSocialLinkedIn] = useState("");
  const [socialWebsite, setSocialWebsite] = useState("");

  const [validFirstName, setValidFirstName] = useState(true);
  const [validLastName, setValidLastName] = useState(true);
  const [validShortIntro, setValidShortIntro] = useState(true);
  const [validAbout, setValidAbout] = useState(true);
  const [validLocationCity, setValidLocationCity] = useState(true);
  const [validLocationCountry, setValidLocationCountry] = useState(true);
  const [validSocialGithub, setValidSocialGithub] = useState(true);
  const [validSocialYoutube, setValidSocialYoutube] = useState(true);
  const [validSocialTwitter, setValidSocialTwitter] = useState(true);
  const [validSocialLinkedIn, setValidSocialLinkedIn] = useState(true);
  const [validSocialWebsite, setValidSocialWebsite] = useState(true);

  const [validFirstNameErrMessage, setValidFirstNameErrMessage] =
    useState(true);
  const [validLastNameErrMessage, setValidLastNameErrMessage] = useState(true);
  const [validShortIntroErrMessage, setValidShortIntroErrMessage] =
    useState(true);
  const [validAboutErrMessage, setValidAboutErrMessage] = useState(true);
  const [validLocationCityErrMessage, setValidLocationCityErrMessage] =
    useState(true);
  const [validLocationCountryErrMessage, setValidLocationCountryErrMessage] =
    useState(true);
  const [validSocialGithubErrMessage, setValidSocialGithubErrMessage] =
    useState(true);
  const [validSocialYoutubeErrMessage, setValidSocialYoutubeErrMessage] =
    useState(true);
  const [validSocialTwitterErrMessage, setValidSocialTwitterErrMessage] =
    useState(true);
  const [validSocialLinkedInErrMessage, setValidSocialLinkedInErrMessage] =
    useState(true);
  const [validSocialWebsiteErrMessage, setValidSocialWebsiteErrMessage] =
    useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const privateProfile = useSelector((state) => state.privateProfile);
  const { loading, error, profile } = privateProfile;

  const editPrivateProfile = useSelector((state) => state.editPrivateProfile);
  const { editLoading, editError } = editPrivateProfile;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!profile) {
        let userId = userInfo[AUTH_USER_ID];
        dispatch(getPrivateProfileForUser(userId));
      } else {
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setShortIntro(profile.shortIntro);
        setAbout(profile.about);
        setLocationCity(profile.locationCity);
        setLocationCountry(profile.locationCountry);
        setSocialGithub(profile.socialGithub);
        setSocialYoutube(profile.socialYoutube);
        setSocialTwitter(profile.socialTwitter);
        setSocialLinkedIn(profile.socialLinkedIn);
        setSocialWebsite(profile.setSocialWebsite);
      }
    }
  }, []);

  const submitHanlder = (e) => {
    e.preventDefault();

    // Clear all previous values for validation
    clearValidation();

    // Validation
    let validationComplete = validateFields();

    if (!validationComplete) {
      return;
    }

    // Update profile
    const profilePrivateId = profile.profilePrivateId;
    const newData = {
      profilePrivateId,
      firstName,
      lastName,
      shortIntro,
      about,
      locationCity,
      locationCountry,
      socialGithub,
      socialYoutube,
      socialTwitter,
      socialLinkedIn,
      socialWebsite,
    };
    dispatch(editPrivateProfileForUser(newData, navigate));
  };

  const validateFields = () => {
    let isValid = validateStringLength(
      firstName,
      PROFILE_VALIDATION.FIRSTNAME_MIN_LENGTH,
      PROFILE_VALIDATION.FIRSTNAME_MAX_LENGTH,
      "First Name"
    );
    setValidFirstName(isValid.result);
    if (!isValid.result) {
      setValidFirstNameErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      firstName,
      PROFILE_VALIDATION.LASTNAME_MIN_LENGTH,
      PROFILE_VALIDATION.LASTNAME_MAX_LENGTH,
      "Last Name"
    );
    setValidLastName(isValid.result);
    if (!isValid.result) {
      setValidLastNameErrMessage(isValid.message);
      return false;
    }

    return true;
  };

  const clearValidation = () => {
    setValidFirstName(true);
    setValidLastName(true);

    setValidFirstNameErrMessage("");
    setValidLastNameErrMessage("");
  };

  return (
    <div className="auth">
      <div className="card">
        <div className="auth__header text-center">
          <HomeIcon />
          <h3>Edit Profile</h3>
          <p>Edit your profile</p>
        </div>
        {error && (
          <Message
            variant="alert alert--error"
            variantStyle={{
              width: "100%",
              display: "inline-block",
              textAlign: "center",
            }}
            message={error.message}
          />
        )}
        {loading && <Loader />}
        {editError && (
          <Message
            variant="alert alert--error"
            variantStyle={{
              width: "100%",
              display: "inline-block",
              textAlign: "center",
            }}
            message={editError.message}
          />
        )}
        {editLoading && <Loader />}
        {profile && (
          <form action="#" className="form auth__form" onSubmit={submitHanlder}>
            <div className="form__field">
              <label htmlFor="formInput#text">First Name: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="First Name"
                defaultValue={profile.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {!validFirstName && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validFirstNameErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Last Name: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Last Name"
                defaultValue={profile.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {!validLastName && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validLastNameErrMessage}
              />
            )}

            <div className="auth__actions">
              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PrivateProfileEdit;
