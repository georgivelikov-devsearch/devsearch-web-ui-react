import React from "react";

function PrivateProfile() {
  return (
    <main className="settingsPage profile my-md">
      <div className="container">
        <div className="layout">
          <div className="column column--1of3">
            <div className="card text-center">
              <div className="card__body dev">
                <a className="tag tag--pill tag--main settings__btn" href="#">
                  <i className="im im-edit"></i> Edit
                </a>
                <img
                  className="avatar avatar--xl dev__avatar"
                  src="../../../images/user-default.png"
                />
                <h2 className="dev__name">Dennis Ivanov</h2>
                <p className="dev__title">
                  Expirance FullStack Developer, Youtuber and Instructor
                </p>
                <p className="dev__location">Based in Florida, USA</p>
                <ul className="dev__social">
                  <li>
                    <a title="Github" href="#" target="_blank">
                      <i className="im im-github"></i>
                    </a>
                  </li>
                  <li>
                    <a title="Stackoverflow" href="#" target="_blank">
                      <i className="im im-stackoverflow"></i>
                    </a>
                  </li>
                  <li>
                    <a title="Twitter" href="#" target="_blank">
                      <i className="im im-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a title="LinkedIn" href="#" target="_blank">
                      <i className="im im-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a title="Personal Website" href="#" target="_blank">
                      <i className="im im-globe"></i>
                    </a>
                  </li>
                </ul>
                <a href="#" className="btn btn--sub btn--lg">
                  Send Message{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="column column--2of3">
            <div className="devInfo">
              <h3 className="devInfo__title">About Me</h3>
              <p className="devInfo__about">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex
                illum ipsum iusto consequatur. Totam, dolorum fugiat, debitis
                facere illo nostrum nesciunt maxime, deserunt enim voluptatibus
                modi natus velit voluptatum. Dicta eritatis exercitationem ut
                quos a placeat obcaecati? Architecto illum!
                <br />
                Amet consectetur adipisicing elit. Veritatis exercitationem ut
                quos a placeat obcaecati? Architecto illum, atque delectus nemo
                dolorem inventore ab facilis? Dolor placeat vel delectus ipsam
                ullam.
              </p>
            </div>
            <div className="settings">
              <h3 className="settings__title">Skills</h3>
              <a
                className="tag tag--pill tag--sub settings__btn tag--lg"
                href="#"
              >
                <i className="im im-plus"></i> Add Skill
              </a>
            </div>

            <table className="settings__table">
              <tr>
                <td className="settings__tableInfo">
                  <h4>JavaScript</h4>
                  <p>
                    Consectetur adipisicing elit. Natus nam dolore aut sed vitae
                    eos architecto unde tempore exercitationem fugiat?...
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
              <tr>
                <td className="settings__tableInfo">
                  <h4>Python</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Est, suscipit...
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
              <tr>
                <td className="settings__tableInfo">
                  <h4>Django</h4>
                  <p>
                    Amet consectetur adipisicing elit. Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Quod, odio Est,
                    suscipit...
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
            </table>

            <div className="settings">
              <h3 className="settings__title">Projects</h3>
              <a
                className="tag tag--pill tag--sub settings__btn tag--lg"
                href="#"
              >
                <i className="im im-plus"></i> Add Project
              </a>
            </div>

            <table className="settings__table">
              <tr>
                <td className="settings__thumbnail">
                  <a href="single-project.html">
                    <img src="images/project-a.png" alt="Project Thumbnail" />
                  </a>
                </td>
                <td className="settings__tableInfo">
                  <a href="single-project.html">Yoga Studio Landing Page</a>
                  <p>
                    Consectetur adipisicing elit. Natus nam dolore aut sed vitae
                    eos architecto unde tempore exercitationem fugiat?...
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
              <tr>
                <td className="settings__thumbnail">
                  <a href="single-project.html">
                    <img src="images/project-b.png" alt="Project Thumbnail" />
                  </a>
                </td>
                <td className="settings__tableInfo">
                  <a href="single-project.html">DevSearch Website UI Design</a>
                  <p>
                    Consectetur adipisicing elit. Natus nam dolore aut sed vitae
                    eos architecto unde tempore exercitationem fugiat?...
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
              <tr>
                <td className="settings__thumbnail">
                  <a href="single-project.html">
                    <img src="images/project-a.png" alt="Project Thumbnail" />
                  </a>
                </td>
                <td className="settings__tableInfo">
                  <a href="single-project.html">Portfolio Website Design</a>
                  <p>
                    Consectetur adipisicing elit. Natus nam dolore aut sed vitae
                    eos architecto unde tempore exercitationem fugiat?...
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
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PrivateProfile;
