import {
  Link
} from "gatsby";
import React, {
  useState
} from "react";
import logo from "../img/halfstack-logo.png";

const Navbar = () => {
  const [active, toggleActive] = useState(false);
  const [navBarActiveClass, setNavbarActiveClass] = useState("");

  const toggleHamburger = () => {
    toggleActive(!active);
    active ? setNavbarActiveClass("is-active") : setNavbarActiveClass("");
  };

  return (
    <React.Fragment>
      <div className="logo-wrap" >
        <Link to="/" className="halfstack-logo" title="Logo" >
          <img src={logo} alt="Halfstack Logo" style={{ maxWidth: "200px" }} />
        </Link>
      </div>
      <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation" >
        <div className="container" >
          <div className="navbar-brand"> {/* Hamburger menu */}
            <div className={`navbar-burger burger ${navBarActiveClass}`} data-target="navMenu" onClick={() => toggleHamburger()}>
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className={`navbar-menu ${navBarActiveClass}`}>
            <div className="navbar-start has-text-centered">
              <Link className="navbar-item" to="/about" >About</Link>
              <Link className="navbar-item" to="/projects" > Projects </Link>
              <Link className="navbar-item" to="/episodes" >Episodes </Link>
              <Link className="navbar-item" to="/contact">Contact</Link>
              {/* <Link className="navbar-item" to="/contact/examples" > Form Examples </Link> */}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
