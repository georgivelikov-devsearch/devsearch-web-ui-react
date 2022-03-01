import React from "react";
import PublicProfileList from "../Profiles/PublicProfileList";

function Index() {
  return (
    <main class="home">
      <section class="hero-section text-center">
        <div class="container container--narrow">
          <div class="hero-section__box">
            <h2>
              CONNECT WITH <span>DEVELOPERS</span>
            </h2>
            <h2>FROM AROUND THE WORLD</h2>
          </div>

          <div class="hero-section__search">
            <form class="form" action="#" method="get">
              <div class="form__field">
                <label for="formInput#search">Search Developers </label>
                <input
                  class="input input--text"
                  id="formInput#search"
                  type="text"
                  name="text"
                  placeholder="Search by developer name"
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

      <PublicProfileList />
    </main>
  );
}

export default Index;
