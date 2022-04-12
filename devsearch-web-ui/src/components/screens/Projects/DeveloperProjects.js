import React from "react";

function DeveloperProjects() {
  return (
    <div>
      <table className="settings__table">
        <tbody>
          <tr>
            <td className="settings__thumbnail">
              <a href="single-project.html">
                <img src="images/project-a.png" alt="Project Thumbnail" />
              </a>
            </td>
            <td className="settings__tableInfo">
              <a href="single-project.html">Yoga Studio Landing Page</a>
              <p>
                Consectetur adipisicing elit. Natus nam dolore aut sed vitae eos
                architecto unde tempore exercitationem fugiat?...
              </p>
            </td>
            <td className="settings__tableActions">
              <a className="tag tag--pill tag--main settings__btn" href="#">
                <i className="im im-edit"></i> Edit
              </a>
              <a className="tag tag--pill tag--main settings__btn" href="#">
                <i className="im im-x-mark-circle-o"></i>
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeveloperProjects;
