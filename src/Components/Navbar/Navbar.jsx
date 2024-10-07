import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import { authContext } from "../../Context/authContext";

const Navbar = () => {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    setToken(null);
    localStorage.removeItem("movieToken");
    navigate("/login");
  }

  return (
    <>
      <nav style={{zIndex:99999999}} className="navbar navbar-expand-lg navbar-light bg-light bg-main">
        <div className="container">
          <Link to="/" className="col-5 col-sm-3 col- col-md-2 me-3">
            <img src={logo} className="w-100" alt="movie logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars text-white"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link me-3 text-white fw-semibold active"
                      aria-current="page"
                      to="/movie"
                    >
                      Movie
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link me-3 text-white fw-semibold"
                      to="/tvShows"
                    >
                      TvShows
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link me-3 text-white fw-semibold"
                      to="/people"
                    >
                      People
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      className="nav-link text-white fw-semibold"
                      role="button"
                    >
                      logout
                      <i className="fa-solid fa-right-from-bracket ms-2"></i>
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link me-3 text-white fw-semibold"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link me-3 text-white fw-semibold"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
