import React from "react";
import PublicProfileList from "../Profiles/PublicProfileList";

function Developers({ isAdmin }) {
  console.log("isAdmin: " + isAdmin);
  return (
    <main class="home">
      <PublicProfileList />
    </main>
  );
}

export default Developers;
