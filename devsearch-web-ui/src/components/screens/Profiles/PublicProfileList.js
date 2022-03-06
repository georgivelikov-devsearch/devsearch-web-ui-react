import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getPublicProfileList } from "../../../actions/profileActions";

import { AUTH_USER_ID } from "../../../constants/userConstants";

import PublicProfileShort from "./PublicProfileShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import Paging from "../Home/Paging";

function PublicProfileList() {
  const [text, setText] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const publicProfileList = useSelector((state) => state.publicProfileList);
  const { error, profiles, totalPages } = publicProfileList;

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let page = searchParams.get("page");
    let searchText = searchParams.get("searchText");
    let userId = null;
    if (userInfo) {
      userId = userInfo[AUTH_USER_ID];
    }

    dispatch(getPublicProfileList(userId, page, searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams, userInfo]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (text) {
      navigate(`/developers?page=1&searchText=${text}`);
    } else {
      navigate("/developers?page=1");
    }
  };

  return (
    <div>
      <section className="hero-section text-center">
        <div className="container container--narrow">
          <div className="hero-section__box">
            <h2>
              CONNECT WITH <span>DEVELOPERS</span>
            </h2>
            <h2>FROM AROUND THE WORLD</h2>
          </div>
          <div className="hero-section__search">
            <form
              className="form"
              action="#"
              method="get"
              onSubmit={submitSearch}
            >
              <div className="form__field">
                <label for="formInput#search">Search Developers </label>
                <input
                  className="input input--text"
                  id="formInput#search"
                  type="text"
                  name="text"
                  placeholder="Search by developer name"
                  defaultValue=""
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <input
                class="btn btn--sub btn--lg"
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
      </section>
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
        <Paging
          totalPages={totalPages}
          currentPage={searchParams.get("page")}
          searchText={searchParams.get("searchText")}
        />
      </section>
    </div>
  );
}

export default PublicProfileList;
