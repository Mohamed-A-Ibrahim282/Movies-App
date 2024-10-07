import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import wave from "../../images/wave.svg";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function MoviesPostersSlider() {
  let [sliderConter, setSliderConter] = useState(7);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1000) {
      setSliderConter(7);
    } else if (window.innerWidth <= 1000 && window.innerWidth >= 770) {
      setSliderConter(5);
    } else if (window.innerWidth <= 770 && window.innerWidth >= 500) {
      setSliderConter(4);
    } else if (this.window.innerWidth < 500) {
      setSliderConter(2);
    }
  });

  function SampleNextArrow() {
    return (
      <div
        style={{ display: "none" }}
      />
    );
  }

  function SamplePrevArrow() {
    return (
      <div
        style={{ display: "none" }}
      />
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: sliderConter,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />
  };

  async function dayTrending() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  async function weekTrending() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }

  const { data: dayTrendingData, isLoading } = useQuery(
    `dayTrending`,
    dayTrending
  );
  const { data: weekTrendingData } = useQuery(`weekTrending`, weekTrending);

  const [movieList, setMovieList] = useState(dayTrendingData?.data.results);

  useEffect(() => {
    if (dayTrendingData?.data.results) {
      setMovieList(dayTrendingData.data.results);
    }
  }, [dayTrendingData]);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="vh-100 fixed-top d-flex align-items-center justify-content-center btnBg">
        <ColorRing
          visible={true}
          height="50"
          width="50"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container pt-5 pb-4">
        <div className="d-flex align-items-center">
          <h4 className="fw-bold text-black me-3">Trending movies</h4>
          <div
            style={{ width: "200px", height: "30px" }}
            className="rounded-pill d-flex borderStyle"
          >
            <div
              id="dayBg"
              role="button"
              className="bg-main w-50 rounded-pill d-flex align-items-center justify-content-center"
              onClick={() => {
                document.getElementById("weekBg").classList.remove("bg-main");
                document
                  .getElementById("weekText")
                  .classList.remove("colorfulText");
                document.getElementById("dayBg").classList.add("bg-main");
                document
                  .getElementById("dayText")
                  .classList.add("colorfulText");
                setMovieList(dayTrendingData.data.results);
              }}
            >
              <h6 id="dayText" className="colorfulText fw-bold mb-0">
                day
              </h6>
            </div>
            <div
              id="weekBg"
              role="button"
              className="w-50 rounded-pill d-flex align-items-center justify-content-center"
              onClick={() => {
                document.getElementById("dayBg").classList.remove("bg-main");
                document
                  .getElementById("dayText")
                  .classList.remove("colorfulText");
                document.getElementById("weekBg").classList.add("bg-main");
                document
                  .getElementById("weekText")
                  .classList.add("colorfulText");
                setMovieList(weekTrendingData.data.results);
              }}
            >
              <h6 id="weekText" className="text-black fw-bold mb-0">
                week
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "350px" }} className="container position-relative">
        <Slider className="row z-3" {...settings}>
          {movieList?.map((movie, index) => (
            <div
              onClick={() => {
                navigate(`/MovieDetails/${movie.id}`);
              }}
              key={index}
              className="rounded-2 border-0 p-3"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                style={{ height: "250px", cursor: "pointer" }}
                className="card-img-top rounded-2"
                alt="..."
              />
              <div style={{ cursor: "pointer" }} className="card-body p-2">
                <h6 className="card-title fw-bold text-black">
                  {movie.title?.split(" ").slice(0, 2).join(" ")}
                </h6>
                <p>{movie.release_date}</p>
              </div>
            </div>
          ))}
        </Slider>
        <div className="waves position-absolute bottom-0 start-0">
          <img src={wave} className="w-100" alt="waves line" />
        </div>
      </div>
    </>
  );
}

export default MoviesPostersSlider;
