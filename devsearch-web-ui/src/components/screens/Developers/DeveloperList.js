import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  getDeveloperList,
  updateSearchForPublicDeveloperList,
} from "../../../actions/developerActions";

import PublicDeveloperShort from "./DeveloperShort";
import Message from "../../common/Message";
import Loader from "../../common/Loader";
import Paging from "../Home/Paging";

function DeveloperList() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const developerList = useSelector((state) => state.developerList);
  const { error, developers, totalPages } = developerList;

  const searchDeveloperList = useSelector((state) => state.searchDeveloperList);

  const { searchParameters } = searchDeveloperList;

  //TODO fix clean search when clicking on icon
  useEffect(() => {
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    let searchText = "";
    if (searchParameters && searchParameters.searchText && search) {
      searchText = searchParameters.searchText;
    }

    setText(searchText);

    dispatch(getDeveloperList(page, searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams, searchParameters]);

  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(updateSearchForPublicDeveloperList(text));
    if (text == null || text.trim() === "") {
      //no search indicator needed
      navigate("/developers?page=1");
    } else {
      navigate("/developers?page=1&search=true");
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
                  value={text}
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
          {developers ? (
            <div class="grid grid--three">
              {" "}
              {developers.map((developer) => (
                <PublicDeveloperShort
                  key={developer.developerPublicId}
                  developer={developer}
                />
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
          totalPages={Number(totalPages)}
          currentPage={Number(searchParams.get("page"))}
          root={"developers"}
          search={searchParams.get("search")}
        />
      </section>
    </div>
  );
}

export default DeveloperList;
