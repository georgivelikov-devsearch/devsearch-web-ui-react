import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getPrivateProfileForUser,
  editPrivateProfileForUser,
} from "../../../actions/profileActions";

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
