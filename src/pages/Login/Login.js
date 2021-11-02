import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";

// Images
import Insta from "../../assets/imgs/instagram.png";
import AppStore from "../../assets/imgs/app-store.png";
import GooglePlay from "../../assets/imgs/google-play.png";

const Login = () => {
  const [contact, setContact] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const json = await fetch("http://localhost:777/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });
    const data = await json.json()

    if (data.token) {
      document.cookie = "token=" + data.token
    }else{
      document.cookie = "token=false"
    }

    setContact({email:"", password:""})
  };
  return (
    <section className="login">
      <div className="login__body">
        <div className="login__body-top">
          <img className="login__logo" src={Insta} alt="logo" />
          <form className="login__form" method="POST" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              className="login__input"
              type="email"
              name="email"
              value={contact.email}
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              className="login__input"
              type="password"
              name="password"
              value={contact.password}
              placeholder="Password"
            />
            <button className="login__btn" type="submit">
              Submit
            </button>
          </form>
          <div className="login__or">OR</div>
          <Link className="login__facebook" to="/signup">
            <span className="login__facebook-link">Login with Facebook</span>
          </Link>
          <Link className="login__forget-link" to="/signup">
            Forgot your password?
          </Link>
        </div>
        <p className="login__body-bottom">
          Don't have an account yet?
          <Link className="login__signup-link" to="/signup">
            Register now
          </Link>
        </p>

        <p className="login__app-text">Install the app</p>
        <div className="login__app-links">
          <Link className="login__app-link" to="/login">
            <img className="login__app-image login__app-image-appstore" src={AppStore} alt="ok"/>
          </Link>
          <Link className="login__app-link" to="/login">
            <img className="login__app-image login__app-image-googleplay" src={GooglePlay} alt="ok"/>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Login;
