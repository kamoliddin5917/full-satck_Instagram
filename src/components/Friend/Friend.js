import "./Friend.css";
import { Link } from "react-router-dom";

const Friend = ({userF}) => {
  return (
    <li className="friend">
      <Link className="nav-profile-link" to="/profile">
        <img
          className="nav-profile-image"
          src={userF.image}
          alt={userF.firstName}
        />
        <span>{userF.firstName}</span>
      </Link>
    </li>
  );
};

export default Friend;
