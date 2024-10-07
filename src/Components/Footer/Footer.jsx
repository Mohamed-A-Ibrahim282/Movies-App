import React from "react";
import logo from "../../images/footerLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-main">
      <div className="container text-white">
        <div className="row">
          <div className="col-sm-6 col-md-3 py-5 d-flex flex-column">
            <img src={logo} className="w-50" alt="logo" />
          </div>

          <div className="col-sm-6 col-md-3 py-5 d-flex flex-column">
            <h4 className="fw-bold">The Basics</h4>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              About TMDB
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Contact Us
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Support Forums
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              API
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              System Status
            </h6>
          </div>

          <div className="col-sm-6 col-md-3 py-5 d-flex flex-column">
            <h4 className="fw-bold">Get Involved</h4>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Contribution Bible
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Add New Movie
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Add New TV Show
            </h6>
          </div>

          <div className="col-sm-6 col-md-3 py-5 d-flex flex-column">
            <h4 className="fw-bold">Legal</h4>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Terms of Use
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              API Terms of Use
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              Privacy Policy
            </h6>
            <h6 style={{ cursor: "pointer" }} className="text-white fw-medium">
              DMCA Policy
            </h6>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
