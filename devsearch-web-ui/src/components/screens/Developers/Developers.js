import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getDeveloperList } from "../../../services/developer/developerService";

import DeveloperList from "./DeveloperList";
import Paging from "../../common/Paging";

function Developers() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { developers, totalPages } = useSelector(
    (state) => state.developer.developerList
  );
  const { developerListError } = useSelector((state) => state.developerError);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("In Developers");
    const page = searchParams.get("page");
    const searchText = searchParams.get("searchText");
    if (searchText) {
      setSearchValue(searchText);
    }

    //console.log("search text: " + searchText);
    //console.log("search value: " + searchValue);
    dispatch(getDeveloperList(page, searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams]);

  const updateSearchValue = (e) => {
    //console.log("updateSearchValue: " + e.target.value);
    setSearchValue(e.target.value);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    //console.log("submitSearch: " + searchValue);
    if (searchValue === null || searchValue.trim() === "") {
      //no searchText needed
      navigate("/developers?page=1");
    } else {
      navigate(`/developers?page=1&searchText=${searchValue}`);
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
                <label htmlFor="formInput#search">Search Developers </label>
                <input
                  className="input input--text"
                  id="formInput#search"
                  type="text"
                  name="searchValue"
                  placeholder="Search by developer name"
                  defaultValue={searchValue}
                  onChange={(e) => updateSearchValue(e)}
                />
              </div>

              <input
                className="btn btn--sub btn--lg"
                type="submit"
                value="Search"
              />
            </form>
          </div>
        </div>
      </section>
      <DeveloperList
        developers={developers}
        developerListError={developerListError}
      />
      <Paging
        totalPages={Number(totalPages)}
        currentPage={Number(searchParams.get("page"))}
        root={"developers"}
        searchText={searchParams.get("searchText")}
      />
    </main>
  );
}

export default Developers;
