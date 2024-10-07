import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const TrendingPeopleSlider = () => {
  let [sliderConter, setSliderConter] = useState(7);
  const navigate = useNavigate();

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

  async function dayTrendingPeople() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/trending/person/day`,
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

  async function weekTrendingPeople() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/trending/person/week`,
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

  const { data: dayTrendingPeopleData, isLoading } = useQuery(
    `dayTrendingPeople`,
    dayTrendingPeople
  );

  const { data: weekTrendingPeopleData } = useQuery(
    `weekTrendingPeople`,
    weekTrendingPeople
  );

  const [peopleList, setPeopleList] = useState(
    dayTrendingPeopleData?.data.results
  );

  useEffect(() => {
    if (dayTrendingPeopleData?.data.results) {
      setPeopleList(dayTrendingPeopleData.data.results);
    }
  }, [dayTrendingPeopleData]);

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
          <h4 className="fw-bold text-black me-3">Trending people</h4>
          <div
            style={{ width: "200px", height: "30px" }}
            className="rounded-pill d-flex borderStyle"
          >
            <div
              id="dayTrendingBg"
              role="button"
              className="bg-main w-50 rounded-pill d-flex align-items-center justify-content-center"
              onClick={() => {
                document
                  .getElementById("weekTrendingBg")
                  .classList.remove("bg-main");
                document
                  .getElementById("weekTrendingText")
                  .classList.remove("colorfulText");
                document
                  .getElementById("dayTrendingBg")
                  .classList.add("bg-main");
                document
                  .getElementById("dayTrendingText")
                  .classList.add("colorfulText");
                setPeopleList(dayTrendingPeopleData.data.results);
              }}
            >
              <h6 id="dayTrendingText" className="colorfulText fw-bold mb-0">
                day
              </h6>
            </div>
            <div
              id="weekTrendingBg"
              role="button"
              className="w-50 rounded-pill d-flex align-items-center justify-content-center"
              onClick={() => {
                document
                  .getElementById("dayTrendingBg")
                  .classList.remove("bg-main");
                document
                  .getElementById("dayTrendingText")
                  .classList.remove("colorfulText");
                document
                  .getElementById("weekTrendingBg")
                  .classList.add("bg-main");
                document
                  .getElementById("weekTrendingText")
                  .classList.add("colorfulText");
                setPeopleList(weekTrendingPeopleData.data.results);
              }}
            >
              <h6 id="weekTrendingText" className="text-black fw-bold mb-0">
                week
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "350px" }} className="container bg-main">
        <Slider className="row" {...settings}>
          {peopleList
            ?.filter((item) => item.profile_path !== null)
            .map((person, index) => (
              <div
                onClick={() => {
                  navigate(`/PeopleDetails/${person.id}`);
                }}
                key={index}
                className="rounded-2 p-3"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                  style={{ height: "250px", cursor: "pointer" }}
                  className="card-img-top rounded-2"
                  alt="..."
                />
                <div style={{ cursor: "pointer" }} className="card-body p-2">
                  <h6 className="card-title fw-bold text-white">
                    {person.name?.split(" ").slice(0, 2).join(" ")}
                  </h6>
                  <p className="text-white">{person.known_for_department}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
};

export default TrendingPeopleSlider;
