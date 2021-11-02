import "./Home.css";
import { Link } from "react-router-dom";
// import {useState}from "react"

// Components
import Header from "../../components/Header/Header";
import Friend from "../../components/Friend/Friend";
import Content from "../../components/Content/Content";

const Home = ({allContents, users, user}) => {

  return (
    <section className="home">
      <Header user={user}/>
      
      <div className="nav-profile container">
        <Link className="nav-profile-link" to="/profile">
          <img
            className="nav-profile-image"
            src={user.image}
            alt={user.firstName}
          />
          <span>Your story</span>
        </Link>

        <ul className="friends">
          {users.map((userF,i) => (
            <Friend key={i} userF={userF}/>
          ))}
        </ul>
      </div>

      <div className="container">
      { allContents.length &&
          <ul className="box">
            {allContents.map((content, i) => {
              // const userOnly = users.find(item => item.id == content.userId)
              // console.log(userOnly);
            return  <Content key={i} content={content} user={user}/>
            })}
          </ul>
      }
      </div>
    </section>
  );
};

export default Home;
