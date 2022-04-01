import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Message from "../../common/Message";

import {
  createSkill,
  editSkill,
  deleteSkill,
} from "../../../actions/skillActions";

function Skills({ developer, canEdit }) {
  const [isSkillPanelOpen, setIsSkillPanelOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [validSkillName, setValidSkillName] = useState(true);
  const [validSkillNameErrMessage, setValidSkillNameErrMessage] = useState("");
  const [isSkillEditPanelOpen, setIsSkillEditPanelOpen] = useState(false);
  const [editedSkillDescriptionId, setEditedSkillDescriptionId] = useState("");
  const [editedSkillName, setEditedSkillName] = useState("");
  const [editedSkillDescription, setEditedSkillDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {}, [setEditedSkillName]);

  const toggleSkillPanel = () => {
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(!isSkillPanelOpen);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");

    //close Edit panel if needed
    setIsSkillEditPanelOpen(false);
    setEditedSkillDescriptionId("");
    setEditedSkillName("");
    setEditedSkillDescription("");
  };

  const toggleSkillEditPanel = (skillDescription) => {
    //close Add panel if needed
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(false);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");

    if (skillDescription.skillDescriptionId === editedSkillDescriptionId) {
      setIsSkillEditPanelOpen(false);
      setEditedSkillDescriptionId("");
      setEditedSkillName("");
      setEditedSkillDescription("");
    } else {
      setEditedSkillDescriptionId(skillDescription.skillDescriptionId);
      setEditedSkillName(skillDescription.skill.skillName);
      setEditedSkillDescription(skillDescription.description);
      setIsSkillEditPanelOpen(true);
      console.log(editedSkillDescriptionId);
    }
  };

  const createSkillHandler = (e) => {
    e.preventDefault();
    if (skillName == null || skillName.trim() === "") {
      setValidSkillName(false);
      setValidSkillNameErrMessage("Please enter Skill Name");
      return;
    }

    const newSkillData = {
      developerId: developer.developerId,
      description: skillDescription,
      skill: {
        skillName: skillName,
      },
    };

    // submit to back end
    dispatch(createSkill(newSkillData, developer));
    // setIsSkillPanelOpen(false);
  };

  const editSkillHandler = (e) => {
    e.preventDefault();
    const editedSkillData = {
      skillDescriptionId: editedSkillDescriptionId,
      developerId: developer.developerId,
      description: editedSkillDescription,
      skill: {
        skillName: editedSkillName,
      },
    };

    console.log(editedSkillData);
    // submit to back end
    dispatch(editSkill(editedSkillData, developer));
    // setIsSkillPanelOpen(false);
  };

  const deleteSkillHandler = (skillDescription) => {
    console.log(skillDescription);
    dispatch(deleteSkill(skillDescription, developer));
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
          onSubmit={createSkillHandler}
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
      {isSkillEditPanelOpen && (
        <form
          action="#"
          className="form devedit__form"
          onSubmit={editSkillHandler}
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
              value={editedSkillName}
              disabled
            />
          </div>
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
              defaultValue={editedSkillDescription}
              onChange={(e) => setEditedSkillDescription(e.target.value)}
            />
          </div>
          <div className="skill__form__buttons">
            <input
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              type="submit"
              value="Save"
            />
            <input
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              type="button"
              value="Cancel"
              onClick={toggleSkillEditPanel}
            />
          </div>
        </form>
      )}
      <table className="settings__table">
        {developer.skillDescriptions.map((skillDescription, index) => (
          <tr key={skillDescription.skillDescriptionId}>
            <td className="settings__tableInfo">
              <h4>{skillDescription.skill.skillName}</h4>
              <p>{skillDescription.description}</p>
            </td>
            {canEdit && (
              <td className="settings__tableActions">
                <div
                  className="tag tag--pill tag--main settings__btn"
                  onClick={() => toggleSkillEditPanel(skillDescription)}
                >
                  <i className="im im-edit"></i> Edit
                </div>
                <div
                  className="tag tag--pill tag--main settings__btn"
                  onClick={() => deleteSkillHandler(skillDescription)}
                >
                  <i className="im im-x-mark-circle-o"></i>
                  Delete
                </div>
              </td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Skills;
