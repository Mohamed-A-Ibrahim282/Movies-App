import axios from "axios";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";

const PeopleDetails = () => {
  const { id } = useParams();
  async function getPeopleDetails() {
    try {
      return await axios.get(`https://api.themoviedb.org/3/person/${id}`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getPeopleImges() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/person/${id}/images`,
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

  async function getPeopleMovies() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/person/${id}/movie_credits`,
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

  async function getPeopleTvShow() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/person/${id}/tv_credits`,
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

  let [showMore, setShowMore] = useState(false);
  let [showMoreText, setshowMoreText] = useState("show more...");
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("PeopleDetails", getPeopleDetails);
  const { data: imagesData } = useQuery("PeopleImges", getPeopleImges);
  const { data: moviesData } = useQuery("PeopleMovies", getPeopleMovies);
  const { data: tvShowsData } = useQuery("PeopleTvShow", getPeopleTvShow);

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
      <div className="container-fluid pb-5">
        <div className="row bg-dark p-5">
          <div className=" col-md-3 p-0">
            <img
              src={`https://image.tmdb.org/t/p/original${data.data.profile_path}`}
              className="w-100 h-100 rounded-start-1"
              alt={`${data.data.name}`}
            />
          </div>

          <div className=" col-md-9 p-3">
            <div className="">
              <h4 className="text-white fw-bold">
                {data.data.name} ({data.data.birthday})
              </h4>
              <div className="py-3">
                <h6 className="text-white me-2">
                  <span className="fw-bold">Place of birth:</span>{" "}
                  {data.data.place_of_birth}{" "}
                </h6>
                <h6 className="text-white me-2">
                  <span className="fw-bold">Birthday:</span>{" "}
                  {data.data.birthday}
                </h6>
                <h6 className="text-white me-2">
                  <span className="fw-bold">Known as:</span>{" "}
                  {data.data.also_known_as.map(
                    (also_known_as) => also_known_as + ",  "
                  )}
                </h6>
              </div>
              <h6 className="text-white fw-bold">Bio</h6>
              {showMore ? (
                <p className="text-white">
                  {data.data.biography}{" "}
                  <span
                    onClick={function () {
                      setShowMore(false);
                      setshowMoreText("show more...");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-primary"
                  >
                    {showMoreText}
                  </span>
                </p>
              ) : (
                <p className="text-white">
                  {data.data.biography.split(" ").slice(0, 100).join(" ")}{" "}
                  <span
                    onClick={function () {
                      setShowMore(true);
                      setshowMoreText("show less...");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-primary"
                  >
                    {showMoreText}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">Images</h4>
          <Link to={`/PeopleImages/${id}`} className="Link my-0 fw-semibold">
            Show all Images <i className="fa-solid fa-angle-right"></i>
          </Link>
        </div>
        <div>
          <div className="row">
            {imagesData?.data.profiles !== null ? (
              <div className="review rounded-3 my-3 p-3">
                <div className="row gy-3">
                  {imagesData?.data.profiles.slice(0, 6).map((img, index) => (
                    <div key={index} className="col-6 col-sm-4 col-md-2">
                      <div className="img">
                        <img
                          src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                          className="w-100"
                          alt=""
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="review rounded-3 my-3 p-3">
                <div className="row py-5 align-items-center justify-content-center">
                  <h5 className="fw-bold text-center">No images</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid bg-main p-5 mt-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold text-white">Known movies</h4>
            <Link
                to={`/PeopleMovies/${id}`}
              className="Link my-0 fw-semibold text-white"
            >
              Show all movies <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
          <div>
            <div className="row">
              {moviesData?.data.cast !== null ? (
                <div className="rounded-3 my-3">
                  <div className="row gy-3">
                    {moviesData?.data.cast
                      .filter((item) => item.poster_path !== null)
                      .slice(0, 6)
                      .map((movie, index) => (
                        <div key={index} className="col-6 col-sm-4 col-md-2">
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(`/MovieDetails/${movie.id}`);
                            }}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                              className="w-100"
                              alt=""
                            />
                            <h5 className="text-white">
                              {movie.original_title}
                            </h5>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="review rounded-3 my-3 p-3">
                  <div className="row py-5 align-items-center justify-content-center">
                    <h5 className="fw-bold text-center">No images</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-5 mb-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold">Known TV shows</h4>
            <Link
                to={`/PeopleTvShows/${id}`}
              className="Link my-0 fw-semibold"
            >
              Show all TV shows <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
          <div>
            <div className="row">
              {tvShowsData?.data.cast !== null ? (
                <div className="rounded-3 my-3">
                  <div className="row gy-3">
                    {tvShowsData?.data.cast
                      .filter((item) => item.poster_path !== null)
                      .slice(0, 6)
                      .map((tvShow, index) => (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/tvListDetails/${tvShow.id}`);
                          }}
                          key={index}
                          className="col-6 col-sm-4 col-md-2"
                        >
                          <div className="">
                            <img
                              src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`}
                              className="w-100"
                              alt=""
                            />
                            <h5>{tvShow.original_name}</h5>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="review rounded-3 my-3 p-3">
                  <div className="row py-5 align-items-center justify-content-center">
                    <h5 className="fw-bold text-center">No images</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeopleDetails;
