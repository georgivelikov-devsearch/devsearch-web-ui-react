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

  //const [text, setText] = useState("");

  const projectList = useSelector((state) => state.project);
  const { projectListError, projects, totalPages } = projectList;

  //const searchDeveloperList = useSelector((state) => state.developerSearchList);

  //const { searchParameters } = searchDeveloperList;

  useEffect(() => {
    const page = searchParams.get("page");
    const search = searchParams.get("search");

    let searchText = "";
    // if (searchParameters && searchParameters.searchText && search) {
    //   searchText = searchParameters.searchText;
    // }

    //setText(searchText);
    dispatch(getAllProjects(page, searchText));
    window.scrollTo(0, 0);
  }, [dispatch, searchParams]);

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
            <form className="form" action="#" method="get">
              <div className="form__field">
                <label htmlFor="formInput#search">Search By Projects </label>
                <input
                  className="input input--text"
                  id="formInput#search"
                  type="text"
                  name="text"
                  placeholder="Search by Project Title"
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
        search={searchParams.get("search")}
      />
    </main>
  );
}

export default Projects;
