import React from "react";

function Projects() {
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
                <label for="formInput#search">Search By Projects </label>
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
      <section className="projectsList"></section>
    </main>
  );
}

export default Projects;
