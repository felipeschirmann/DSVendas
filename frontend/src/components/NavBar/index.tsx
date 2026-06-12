import ImgDsDark from "assets/img/ds-dark.svg";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="glass-navbar d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-4">
      <div className="container">
        <nav className="logo-container my-1">
          <Link to="/">
            <img src={ImgDsDark} alt="DevSuperior" width="120" />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
