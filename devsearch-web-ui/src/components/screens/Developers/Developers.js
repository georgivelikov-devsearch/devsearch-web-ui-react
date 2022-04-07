import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  getDeveloperList,
  updateSearchForPublicDeveloperList,
} from "../../../services/developer/developerService";

import DeveloperList from "./DeveloperList";
import Paging from "../../common/Paging";

function Developers() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState("");

  const developerList = useSelector((state) => state.developerList);
  const { error, developers, totalPages } = developerList;

  const searchDeveloperList = useSelector((state) => state.developerSearchList);

  const { searchParameters } = searchDeveloperList;

  useEffect(() => {
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    let searchText = "";
    if (searchParameters && searchParameters.searchText && search) {
      searchText = searchParameters.searchText;
    }

    setText(searchText);
    console.log("0");
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
    <main className="home">
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
      <DeveloperList developers={developers} error={error} />
      <Paging
        totalPages={Number(totalPages)}
        currentPage={Number(searchParams.get("page"))}
        root={"developers"}
        search={searchParams.get("search")}
      />
    </main>
  );
}

export default Developers;
