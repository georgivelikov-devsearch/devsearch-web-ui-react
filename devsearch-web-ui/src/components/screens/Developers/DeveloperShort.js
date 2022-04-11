import { Link } from "react-router-dom";

function DeveloperShort({ developer }) {
  return (
    <div className="column card">
      <div className="dev">
        <Link to={`/developers/${developer.username}`} className="card__body">
          <div className="dev__developer">
            <img
              className="avatar avatar--md"
              src={
                developer.developerPictureUrl
                  ? developer.developerPictureUrl
                  : "../../../images/user-default.png"
              }
              alt=""
            />
            <div className="dev__meta">
              <h3>
                {developer.firstName} {developer.lastName}
              </h3>
              <p className="dev__username">({developer.username})</p>
              <h5>{developer.shortIntro}</h5>
            </div>
          </div>
          <p className="dev__info">{developer.about}</p>
          <div className="dev__skills">
            {developer.skillDescriptions.map((skillDescription) => (
              <span
                key={skillDescription.publicKey}
                className="tag tag--pill tag--main"
              >
                <small>{skillDescription.skill.skillName} </small>
              </span>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DeveloperShort;
