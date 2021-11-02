import { Link } from "react-router-dom";
import "./Content.css";

const Content = ({content, user}) => {
  return (
    <li className="content">
      <Link className="content__link" to="/profile">
        <img src={user.image} alt="ok"/>
        <h3>{user.firstName}</h3>
      </Link>
      <div>
        {content.image && <img className="content__img" src={content.image} alt={content.content} width="200" height="200"/>}
        {content.video && <video className="content__video" width="200" height="200" controls autoPlay muted="muted">
          <source src={content.video} type="video/mp4" />
        </video> }
        <p>
         {content.content}
        </p>
      </div>
    </li>
  );
};

export default Content;
