import { Link } from "react-router-dom";

function HomeIcon() {
  return (
    <Link to="/developers/1">
      <img src="/images/icon.svg" alt="icon" />
    </Link>
  );
}

export default HomeIcon;
