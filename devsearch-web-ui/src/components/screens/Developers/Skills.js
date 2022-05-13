import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../common/Message";
import Loader from "../../common/Loader";
import { DraggableArea } from "react-draggable-tags";

import {
  addSkill,
  editSkill,
  deleteSkill,
  orderSkills,
  clearSkillError,
} from "../../../services/developer/skillService";

function Skills({ developer, canEdit }) {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { skillDescriptions, skillError } = useSelector((state) => state.skill);

  const [allSkillDescriptions, setAllSkillDescriptions] = useState([]);
  const [isSkillPanelOpen, setIsSkillPanelOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [validSkillName, setValidSkillName] = useState(true);
  const [validSkillNameErrMessage, setValidSkillNameErrMessage] = useState("");
  const [isSkillEditPanelOpen, setIsSkillEditPanelOpen] = useState(false);
  const [editedSkillDescriptionId, setEditedSkillDescriptionId] = useState("");
  const [editedSkillName, setEditedSkillName] = useState("");
  const [editedSkillDescription, setEditedSkillDescription] = useState("");
  const [isOrderPanelOpen, setIsOrderPanelOpen] = useState(false);
  const [topSkills, setTopSkills] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (loading) {
      return;
    }
    let skills = [...skillDescriptions];
    skills.sort((a, b) => a.position - b.position);
    setAllSkillDescriptions(skills);
    let devTopSkills = skills.slice(0, 3);
    setTopSkills(devTopSkills);
    let tagArray = [];
    skills.forEach((skillDescription) => {
      let newTag = {
        // Unique 'id' is needed for ordering tags properly in 'DraggableArea'.
        // This 'id' should be send to Backend with care, or shouldn't be send at all, cause it may cause problems.
        id: skillDescription.skillDescriptionId,
        skillDescriptionId: skillDescription.skillDescriptionId,
        position: skillDescription.position,
        description: skillDescription.description,
        skill: skillDescription.skill,
      };
      tagArray.push(newTag);
    });
    setTags(tagArray);
  }, [loading, developer, skillDescriptions]);

  const toggleSkillPanel = () => {
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(!isSkillPanelOpen);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");

    // close Order panel if needed
    setIsOrderPanelOpen(false);

    //close Edit panel if needed
    setIsSkillEditPanelOpen(false);
    setEditedSkillDescriptionId("");
    setEditedSkillName("");
    setEditedSkillDescription("");

    //clear error if it exists
    dispatch(clearSkillError());
  };

  const toggleOrderPanel = () => {
    //close Add panel if needed
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(false);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");

    //close Edit panel if needed
    setIsSkillEditPanelOpen(false);
    setEditedSkillDescriptionId("");
    setEditedSkillName("");
    setEditedSkillDescription("");

    setIsOrderPanelOpen(!isOrderPanelOpen);
  };

  const toggleSkillEditPanel = (skillDescription) => {
    //close Add panel if needed
    setSkillName("");
    setSkillDescription("");
    setIsSkillPanelOpen(false);
    setValidSkillName(true);
    setValidSkillNameErrMessage("");

    // close Order panel if needed
    setIsOrderPanelOpen(false);

    if (
      !skillDescription ||
      skillDescription.skillDescriptionId === editedSkillDescriptionId
    ) {
      setIsSkillEditPanelOpen(false);
      setEditedSkillDescriptionId("");
      setEditedSkillName("");
      setEditedSkillDescription("");
    } else {
      setEditedSkillDescriptionId(skillDescription.skillDescriptionId);
      setEditedSkillName(skillDescription.skill.skillName);
      setEditedSkillDescription(skillDescription.description);
      setIsSkillEditPanelOpen(true);
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

    dispatch(addSkill(newSkillData, toggleSkillPanel));
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

    dispatch(editSkill(editedSkillData));
    toggleSkillEditPanel();
  };

  const deleteSkillHandler = (skillDescriptionId) => {
    dispatch(deleteSkill(skillDescriptionId));
    if (isSkillEditPanelOpen) {
      toggleSkillEditPanel();
    }
  };

  const orderSkillsHandler = () => {
    dispatch(orderSkills(tags, developer));
    toggleOrderPanel();
  };

  return (
    <div>
      <div className="settings">
        <h3 className="settings__title">Skills</h3>
        {canEdit && (
          <div>
            <div
              onClick={toggleSkillPanel}
              className="tag tag--pill tag--sub settings__btn tag--lg"
            >
              <i className="im im-plus"></i> Add Skill
            </div>
            <div
              onClick={toggleOrderPanel}
              className="tag tag--pill tag--sub settings__btn tag--lg"
            >
              <i className="im im-edit"></i> Order Skills
            </div>
          </div>
        )}
      </div>
      {isOrderPanelOpen && (
        <div>
          <div className="order__area">
            <DraggableArea
              tags={tags}
              render={({ tag, index }) => (
                <div className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button">
                  {tag.skill.skillName}
                </div>
              )}
              onChange={(tags) => setTags(tags)}
            />
          </div>
          <div className="skill__form__buttons">
            <div
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              onClick={() => orderSkillsHandler()}
            >
              Save Order
            </div>
            <div
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              onClick={() => toggleOrderPanel()}
            >
              Cancel
            </div>
          </div>
        </div>
      )}
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
      {skillError && (
        <Message
          variant="alert alert--error"
          variantStyle={{
            width: "100%",
            display: "inline-block",
            textAlign: "center",
          }}
          message={skillError.message}
        />
      )}
      <table className="settings__table">
        <tbody>
          {topSkills.map((skillDescription) => (
            <tr key={skillDescription.publicKey}>
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
                    onClick={() =>
                      deleteSkillHandler(skillDescription.skillDescriptionId)
                    }
                  >
                    <i className="im im-x-mark-circle-o"></i>
                    Delete
                  </div>
                </td>
              )}
              {!canEdit && (
                <td className="settings__tableActions">
                  <div
                    className="tag tag--pill tag--main settings__btn hidden"
                    onClick={() => toggleSkillEditPanel(skillDescription)}
                  >
                    <i className="im im-edit"></i> Edit
                  </div>
                  <div
                    className="tag tag--pill tag--main settings__btn hidden"
                    onClick={() =>
                      deleteSkillHandler(skillDescription.skillDescriptionId)
                    }
                  >
                    <i className="im im-x-mark-circle-o"></i>
                    Delete
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order__skills">
        {allSkillDescriptions.map((skillDescription) => (
          <div
            key={skillDescription.publicKey}
            className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
            onClick={() => toggleSkillEditPanel(skillDescription)}
          >
            {skillDescription.skill.skillName}{" "}
          </div>
        ))}
      </div>
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
              value={editedSkillDescription}
              onChange={(e) => setEditedSkillDescription(e.target.value)}
            />
          </div>
          <div className="skill__form__buttons">
            <input
              className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
              type="submit"
              value="Save"
            />
            <div>
              <input
                className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
                type="button"
                value="Delete"
                onClick={() => deleteSkillHandler(editedSkillDescriptionId)}
              />
              <input
                className="tag tag--pill tag--sub settings__btn tag--lg skill__form__button"
                type="button"
                value="Cancel"
                onClick={() => toggleSkillEditPanel()}
              />
            </div>
          </div>
        </form>
      )}
      {loading && <Loader />}
    </div>
  );
}

export default Skills;
