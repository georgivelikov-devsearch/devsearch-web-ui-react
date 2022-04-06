import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDeveloper,
  editDeveloper,
} from "../../../actions/developerActions_2";

import { validateStringLength } from "../../../utils/validator";
import { getBase64FromFile } from "../../../utils/utils";
import { DEVELOPER_VALIDATION } from "../../../constants/developerConstants";

import HomeIcon from "../../common/HomeIcon";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

import UserService from "../../../services/identity/keycloak/keycloakUserService";

function DeveloperEdit() {
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
  const [developerPictureUrl, setDeveloperPictureUrl] = useState("");
  // used for upload
  const [developerPictureBase64, setDeveloperPictureBase64] = useState("");
  // this is done because there is no need to reupload the picture to
  //the File Service every time when update request is send to the backend (it is limited free account)
  const [newDeveloperPictureUpload, setNewDeveloperPictureUpload] =
    useState(false);

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

  const developerState = useSelector((state) => state.developer);
  const { loading, error, developer } = developerState;

  const editDeveloperState = useSelector((state) => state.developerEdit);
  const { editLoading, editError } = editDeveloperState;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!UserService.isLoggedIn()) {
      UserService.doLogin();
    } else if (!developer) {
      dispatch(getDeveloper());
    } else {
      setFirstName(developer.firstName);
      setLastName(developer.lastName);
      setShortIntro(developer.shortIntro);
      setAbout(developer.about);
      setLocationCity(developer.locationCity);
      setLocationCountry(developer.locationCountry);
      setSocialGithub(developer.socialGithub);
      setSocialYoutube(developer.socialYoutube);
      setSocialTwitter(developer.socialTwitter);
      setSocialLinkedIn(developer.socialLinkedIn);
      setSocialWebsite(developer.setSocialWebsite);
      setDeveloperPictureUrl(developer.developerPictureUrl);
    }
  }, [dispatch, navigate, developer]);

  const goBack = () => {
    navigate("/developers/" + developer.username);
  };

  const uploadDeveloperImage = async (e) => {
    let file = e.target.files[0];
    let base64Picture = await getBase64FromFile(file);

    setDeveloperPictureUrl(base64Picture);
    setNewDeveloperPictureUpload(true);
    setDeveloperPictureBase64(base64Picture);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Clear all previous values for validation
    clearValidation();

    // Validation
    let validationComplete = validateFields();

    if (!validationComplete) {
      return;
    }

    // Update developer
    const developerId = developer.developerId;
    const username = developer.username;
    const newData = {
      developerId,
      username,
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
      developerPictureBase64,
      newDeveloperPictureUpload,
    };

    dispatch(editDeveloper(newData, username, navigate));
  };

  const validateFields = () => {
    let isValid = validateStringLength(
      firstName,
      DEVELOPER_VALIDATION.FIRSTNAME_MIN_LENGTH,
      DEVELOPER_VALIDATION.FIRSTNAME_MAX_LENGTH,
      "First Name"
    );
    setValidFirstName(isValid.result);
    if (!isValid.result) {
      setValidFirstNameErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      lastName,
      DEVELOPER_VALIDATION.LASTNAME_MIN_LENGTH,
      DEVELOPER_VALIDATION.LASTNAME_MAX_LENGTH,
      "Last Name"
    );
    setValidLastName(isValid.result);
    if (!isValid.result) {
      setValidLastNameErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      shortIntro,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SHORTINTRO_MAX_LENGTH,
      "Short Intro"
    );
    setValidShortIntro(isValid.result);
    if (!isValid.result) {
      setValidShortIntroErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      about,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.ABOUT_MAX_LENGTH,
      "About Info"
    );
    setValidAbout(isValid.result);
    if (!isValid.result) {
      setValidAboutErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      locationCity,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.CITY_MAX_LENGTH,
      "City"
    );
    setValidLocationCity(isValid.result);
    if (!isValid.result) {
      setValidLocationCityErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      locationCountry,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.COUTRY_MAX_LENGTH,
      "Country"
    );
    setValidLocationCountry(isValid.result);
    if (!isValid.result) {
      setValidLocationCountryErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialGithub,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SOCIAL_MAX_LENGTH,
      "Github link"
    );
    setValidSocialGithub(isValid.result);
    if (!isValid.result) {
      setValidSocialGithubErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialYoutube,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SOCIAL_MAX_LENGTH,
      "Youtube link"
    );
    setValidSocialYoutube(isValid.result);
    if (!isValid.result) {
      setValidSocialYoutubeErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialTwitter,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SOCIAL_MAX_LENGTH,
      "Twitter link"
    );
    setValidSocialTwitter(isValid.result);
    if (!isValid.result) {
      setValidSocialTwitterErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialLinkedIn,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SOCIAL_MAX_LENGTH,
      "LinkedIn link"
    );
    setValidSocialLinkedIn(isValid.result);
    if (!isValid.result) {
      setValidSocialLinkedInErrMessage(isValid.message);
      return false;
    }

    isValid = validateStringLength(
      socialWebsite,
      DEVELOPER_VALIDATION.NO_MIN_LENGTH,
      DEVELOPER_VALIDATION.SOCIAL_MAX_LENGTH,
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
    <div className="devedit">
      <div className="card">
        <div className="devedit__header text-center">
          <HomeIcon />
          <h3>Edit Developer</h3>
          <p>Edit your developer</p>
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
        {developer && (
          <form
            action="#"
            className="form devedit__form"
            onSubmit={submitHandler}
          >
            <div className="form__field">
              <label htmlFor="formInput#image">
                <img
                  className="avatar avatar--xl dev__avatar"
                  src={
                    developerPictureUrl
                      ? developerPictureUrl
                      : "../../../images/user-default.png"
                  }
                  alt=""
                />
              </label>
              <input
                style={{ display: "none" }}
                className="input input--text"
                id="formInput#image"
                type="file"
                name="file"
                accept="image/png, image/jpeg"
                onChange={(e) => uploadDeveloperImage(e)}
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
                defaultValue={developer.firstName}
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
                defaultValue={developer.lastName}
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
                defaultValue={developer.locationCity}
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
                defaultValue={developer.locationCountry}
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
                defaultValue={developer.shortIntro}
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
                defaultValue={developer.about}
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
                defaultValue={developer.socialGithub}
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
                defaultValue={developer.socialYoutube}
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
                defaultValue={developer.socialTwitter}
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
                defaultValue={developer.socialLinkedIn}
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
                defaultValue={developer.socialWebsite}
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

            <div className="devedit__actions">
              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Save"
              />
              <input
                className="btn btn--sub btn--lg"
                type="button"
                value="Cancel"
                onClick={goBack}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DeveloperEdit;
