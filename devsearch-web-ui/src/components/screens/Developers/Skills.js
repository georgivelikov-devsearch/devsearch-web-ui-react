import React from "react";
import { useState, useEffect } from "react";
import Message from "../../common/Message";
function Skills({ developer, canEdit }) {
  const [isSkillPanelOpen, setIsSkillPanelOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [validSkillName, setValidSkillName] = useState(true);
  const [validSkillNameErrMessage, setValidSkillNameErrMessage] = useState("");

  const toggleSkillPanel = () => {
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(!isSkillPanelOpen);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");
  };

  const submitSkillHandler = (e) => {
    e.preventDefault();
    console.log(skillName);
    if (skillName == null || skillName.trim() === "") {
      setValidSkillName(false);
      setValidSkillNameErrMessage("Please enter Skill Name");
      return;
    }

    // submit to back end
    // setIsSkillPanelOpen(false);
  };
  return (
    <div>
      <div className="settings">
        <h3 className="settings__title">Skills</h3>
        {canEdit && (
          <div
            onClick={toggleSkillPanel}
            className="tag tag--pill tag--sub settings__btn tag--lg"
          >
            <i className="im im-plus"></i> Add Skill
          </div>
        )}
      </div>
      {isSkillPanelOpen && (
        <form
          action="#"
          className="form devedit__form"
          onSubmit={submitSkillHandler}
        >
          <div className="skill__form__field">
            <label className="skill__form__label" htmlFor="formInput#text">
              Skill:{" "}
            </label>
            <input
              className="input input--text skill__form__input"
              id="formInput#text"
              type="text"
              name="text"
              placeholder="Skill"
              defaultValue=""
              onChange={(e) => setSkillName(e.target.value)}
            />
          </div>
          {!validSkillName && (
            <Message
              variant="alert alert--error"
              variantStyle={{ width: "100%" }}
              message={validSkillNameErrMessage}
            />
          )}
          <div className="skill__form__field">
            <label className="skill__form__label" htmlFor="formInput#textarea">
              Description:{" "}
            </label>
            <textarea
              className="input input--textarea skill__form__input"
              id="formInput#textarea"
              type="textarea"
              name="text"
              placeholder="Skill Description"
              defaultValue=""
              onChange={(e) => setSkillDescription(e.target.value)}
            />
          </div>
          <div className="skill__form__buttons">
            <input
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              type="submit"
              value="Add"
            />
            <input
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              type="button"
              value="Cancel"
              onClick={toggleSkillPanel}
            />
          </div>
        </form>
      )}
      <table className="settings__table">
        <tr>
          <td className="settings__tableInfo">
            <h4>JavaScript</h4>
            <p>
              Consectetur adipisicing elit. Natus nam dolore aut sed vitae eos
              architecto unde tempore exercitationem fugiat?...
            </p>
          </td>
          {canEdit && (
            <td className="settings__tableActions">
              <a className="tag tag--pill tag--main settings__btn" href="#">
                <i className="im im-edit"></i> Edit
              </a>
              <a className="tag tag--pill tag--main settings__btn" href="#">
                <i className="im im-x-mark-circle-o"></i>
                Delete
              </a>
            </td>
          )}
        </tr>
        <tr>
          <td className="settings__tableInfo">
            <h4>Python</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
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
        <tr>
          <td className="settings__tableInfo">
            <h4>Django</h4>
            <p>
              Amet consectetur adipisicing elit. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Quod, odio Est, suscipit...
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
  );
}

export default Skills;
