import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getPrivateProfileForUser,
  editPrivateProfileForUser,
} from "../../../actions/profileActions";

import { validateStringLength } from "../../../utils/validator";
import { getBase64FromFile } from "../../../utils/utils";
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
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [profilePictureBase64, setProfilePictureBase64] = useState(""); // used for upload

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
  }, [dispatch, navigate, userInfo, profile]);

  const uploadProfileImage = async (e) => {
    let file = e.target.files[0];
    let base64Picture = await getBase64FromFile(file);
    console.log(base64Picture.length);

    setProfilePictureBase64(base64Picture);
  };

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
      profilePictureBase64,
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
      lastName,
      PROFILE_VALIDATION.LASTNAME_MIN_LENGTH,
      PROFILE_VALIDATION.LASTNAME_MAX_LENGTH,
      "Last Name"
    );
    setValidLastName(isValid.result);
    if (!isValid.result) {
      setValidLastNameErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      shortIntro,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SHORTINTRO_MAX_LENGTH,
      "Short Intro"
    );
    setValidShortIntro(isValid.result);
    if (!isValid.result) {
      setValidShortIntroErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      about,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.ABOUT_MAX_LENGTH,
      "About Info"
    );
    setValidAbout(isValid.result);
    if (!isValid.result) {
      setValidAboutErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      locationCity,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.CITY_MAX_LENGTH,
      "City"
    );
    setValidLocationCity(isValid.result);
    if (!isValid.result) {
      setValidLocationCityErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      locationCountry,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.COUTRY_MAX_LENGTH,
      "Country"
    );
    setValidLocationCountry(isValid.result);
    if (!isValid.result) {
      setValidLocationCountryErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialGithub,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SOCIAL_MAX_LENGTH,
      "Github link"
    );
    setValidSocialGithub(isValid.result);
    if (!isValid.result) {
      setValidSocialGithubErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialYoutube,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SOCIAL_MAX_LENGTH,
      "Youtube link"
    );
    setValidSocialYoutube(isValid.result);
    if (!isValid.result) {
      setValidSocialYoutubeErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialTwitter,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SOCIAL_MAX_LENGTH,
      "Twitter link"
    );
    setValidSocialTwitter(isValid.result);
    if (!isValid.result) {
      setValidSocialTwitterErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialLinkedIn,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SOCIAL_MAX_LENGTH,
      "LinkedIn link"
    );
    setValidSocialLinkedIn(isValid.result);
    if (!isValid.result) {
      setValidSocialLinkedInErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialWebsite,
      PROFILE_VALIDATION.NO_MIN_LENGTH,
      PROFILE_VALIDATION.SOCIAL_MAX_LENGTH,
      "Website link"
    );
    setValidSocialWebsite(isValid.result);
    if (!isValid.result) {
      setValidSocialWebsiteErrMessage(isValid.message);
      return false;
    }

    return true;
  };

  const clearValidation = () => {
    setValidFirstName(true);
    setValidLastName(true);
    setValidShortIntro(true);
    setValidAbout(true);
    setValidLocationCity(true);
    setValidLocationCountry(true);
    setValidSocialGithub(true);
    setValidSocialYoutube(true);
    setValidSocialTwitter(true);
    setValidSocialLinkedIn(true);
    setValidSocialWebsite(true);

    setValidFirstNameErrMessage("");
    setValidLastNameErrMessage("");
    setValidShortIntroErrMessage("");
    setValidAboutErrMessage("");
    setValidLocationCityErrMessage("");
    setValidLocationCountryErrMessage("");
    setValidSocialGithubErrMessage("");
    setValidSocialYoutubeErrMessage("");
    setValidSocialTwitterErrMessage("");
    setValidSocialLinkedInErrMessage("");
    setValidSocialWebsiteErrMessage("");
  };

  return (
    <div className="profedit">
      <div className="card">
        <div className="profedit__header text-center">
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
          <form
            action="#"
            className="form profedit__form"
            onSubmit={submitHanlder}
          >
            <div className="form__field">
              <label htmlFor="formInput#image">
                <img
                  className="avatar avatar--xl dev__avatar"
                  src={
                    profile.profilePictureUrl
                      ? profile.profilePictureUrl
                      : "../../../images/user-default.png"
                  }
                />
              </label>
              <input
                style={{ display: "none" }}
                className="input input--text"
                id="formInput#image"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                onChange={(e) => uploadProfileImage(e)}
              />
            </div>
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
            <div className="form__field">
              <label htmlFor="formInput#text">City: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="City"
                defaultValue={profile.locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
              />
            </div>
            {!validLocationCity && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validLocationCityErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Country: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Country"
                defaultValue={profile.locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
              />
            </div>
            {!validLocationCountry && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validLocationCountryErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Short Intro: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Short Intro"
                defaultValue={profile.shortIntro}
                onChange={(e) => setShortIntro(e.target.value)}
              />
            </div>
            {!validShortIntro && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validShortIntroErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#textarea">About: </label>
              <textarea
                className="input input--textarea"
                id="formInput#textarea"
                type="textarea"
                name="text"
                placeholder="About"
                defaultValue={profile.about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            {!validAbout && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validAboutErrMessage}
              />
            )}
            <div className="form__field">
              <label htmlFor="formInput#text">Github: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Github"
                defaultValue={profile.socialGithub}
                onChange={(e) => setSocialGithub(e.target.value)}
              />
            </div>
            {!validSocialGithub && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validSocialGithubErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Youtube: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Youtube"
                defaultValue={profile.socialYoutube}
                onChange={(e) => setSocialYoutube(e.target.value)}
              />
            </div>
            {!validSocialYoutube && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validSocialYoutubeErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Twitter: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Twitter"
                defaultValue={profile.socialTwitter}
                onChange={(e) => setSocialTwitter(e.target.value)}
              />
            </div>
            {!validSocialTwitter && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validSocialTwitterErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">LinkedIn: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="LinkedIn"
                defaultValue={profile.socialLinkedIn}
                onChange={(e) => setSocialLinkedIn(e.target.value)}
              />
            </div>
            {!validSocialLinkedIn && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validSocialLinkedInErrMessage}
              />
            )}

            <div className="form__field">
              <label htmlFor="formInput#text">Website: </label>
              <input
                className="input input--text"
                id="formInput#text"
                type="text"
                name="text"
                placeholder="Website"
                defaultValue={profile.socialWebsite}
                onChange={(e) => setSocialWebsite(e.target.value)}
              />
            </div>
            {!validSocialWebsite && (
              <Message
                variant="alert alert--error"
                variantStyle={{ width: "100%" }}
                message={validSocialWebsiteErrMessage}
              />
            )}

            <div className="profedit__actions">
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
