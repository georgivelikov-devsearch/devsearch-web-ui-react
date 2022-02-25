import React from "react";
import { useState, useEffect } from "react";
import { editPrivateProfileForUser } from "../../../actions/profileActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from "../../common/HomeIcon";
import Message from "../../common/Message";
import Loader from "../../common/Loader";

function PrivateProfileEdit() {
  const privateProfile = useSelector((state) => state.privateProfile);
  const { loading, error, profile } = privateProfile;

  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [shortIntro, setShortIntro] = useState(profile.shortIntro);
  const [about, setAbout] = useState(profile.about);
  const [locationCity, setLocationCity] = useState(profile.locationCity);
  const [locationCountry, setLocationCountry] = useState(
    profile.locationCountry
  );
  const [socialGithub, setSocialGithub] = useState(profile.socialGithub);
  const [socialYoutube, setSocialYoutube] = useState(profile.socialYoutube);
  const [socialTwitter, setSocialTwitter] = useState(profile.socialTwitter);
  const [socialLinkedIn, setSocialLinkedIn] = useState(profile.socialLinkedIn);
  const [socialWebsite, setSocialWebsite] = useState(profile.setSocialWebsite);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editPrivateProfile = useSelector((state) => state.editPrivateProfile);
  const { editLoading, editError } = editPrivateProfile;

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
