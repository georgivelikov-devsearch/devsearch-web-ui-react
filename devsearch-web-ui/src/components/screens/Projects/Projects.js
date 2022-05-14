import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProjects } from "../../../services/project/projectService";

import ProjectList from "./ProjectList";
import Paging from "../../common/Paging";

function Projects() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectList = useSelector((state) => state.project);
  const { projectListError, projects, totalPages } = projectList;
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    console.log("In Projects");
    const page = searchParams.get("page");
    const searchText = searchParams.get("searchText");
    if (searchText) {
      setSearchValue(searchText);
    }

    //setText(searchText);
    dispatch(getAllProjects(page, searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams]);

  const submitSearch = (e) => {
    e.preventDefault();
    if (searchValue === null || searchValue.trim() === "") {
      //no searchText needed
      navigate("/projects?page=1");
    } else {
      navigate(`/projects?page=1&searchText=${searchValue}`);
    }
  };

  return (
    <main className="projects">
      <section className="hero-section text-center">
        <div className="container container--narrow">
          <div className="hero-section__box">
            <h2>
              Search for <span>Projects</span>
            </h2>
          </div>

          <div className="hero-section__search">
            <form
              className="form"
              action="#"
              method="get"
              onSubmit={submitSearch}
            >
              <div className="form__field">
                <label htmlFor="formInput#search">Search By Projects </label>
                <input
                  className="input input--text"
                  id="formInput#search"
                  type="text"
                  name="text"
                  placeholder="Search by project title"
                  defaultValue={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
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
      <ProjectList projects={projects} projectListError={projectListError} />
      <Paging
        totalPages={Number(totalPages)}
        currentPage={Number(searchParams.get("page"))}
        root={"projects"}
        searchText={searchParams.get("searchText")}
      />
    </main>
  );
}

export default Projects;
