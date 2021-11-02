import "./Header.css";
import { Link, NavLink } from "react-router-dom";

// Images
import Instagram from "../../assets/imgs/instagram-icon.svg"
import InstagramText from "../../assets/imgs/instagram.png"

// Components
import {HomeSvg, Search, Like} from "../SVG/SVG"

const Header=({user})=>{
    return <header className="header">
        <div className="container">
            <Link className="header__logo" to="/">
                <img className="logo__img" src={Instagram} alt="ok"/>
                <img className="logo__img-text" src={InstagramText} alt="ok"/>
            </Link>

            <nav className="navbar">
                <NavLink className="nav__link" activeClassName="nav__link-active" to="/"><HomeSvg/></NavLink>
                <NavLink className="nav__link" activeClassName="nav__link-active" to="/"><Search/></NavLink>
                <NavLink className="nav__link" activeClassName="nav__link-active" to="/"><Like/></NavLink>
            </nav>

            <Link to="/profile"><img className="home__profile-image" src={user.image} alt="ok"/></Link>
        </div>
    </header>
}

export default Header
