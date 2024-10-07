import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MovieSlider() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <div className="row g-0 position-relative">
        <div className="position-absolute start-0 end-0 top-0 bottom-0 layer z-3 d-flex flex-column justify-content-center align-items-center">
          <div className="container">
            <h3 className="text-white fw-bold mb-5">
              Welcome.
              <br /> Millions of movies, TV shows and people to discover.
              Explore now.
            </h3>
            <div style={{height:"40px"}} className="w-100 rounded-pill bg-white"></div>
          </div>
        </div>
        <div>
          <Slider {...settings}>
            <div>
              <img
                style={{ height: "400px" }}
                className="w-100"
                src={require("../../images/posters/poster1.jpg")}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ height: "400px" }}
                className="w-100"
                src={require("../../images/posters/poster2.jpg")}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ height: "400px" }}
                className="w-100"
                src={require("../../images/posters/poster3.jpg")}
                alt=""
              />
            </div>
            <div>
              <img
                style={{ height: "400px" }}
                className="w-100"
                src={require("../../images/posters/poster4.jpg")}
                alt=""
              />
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

export default MovieSlider;
