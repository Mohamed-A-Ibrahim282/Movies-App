import axios from "axios";
import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const PeopleMovies = () => {
  const { id } = useParams();
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

  const navigate = useNavigate();
  const { data, isLoading } = useQuery("PeopleMovies", getPeopleMovies);

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
      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-start">
          <h3 className="fw-bold bg-primary text-white py-2 px-5 my-3 rounded-2 m-auto">
            Known movies
          </h3>
        </div>
        <div className="d-flex align-items-center justify-content-between"></div>
        <div>
          <div className="row">
            {data?.data.cast !== null ? (
              <div className="rounded-3 my-3">
                <div className="row gy-3">
                  {data?.data.cast
                    .filter((item) => item.poster_path !== null)
                    .map((movie, index) => (
                      <div key={index} className="col-6 col-sm-4 col-md-2">
                        <div
                          className="review p-2"
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
                          <h5 className="mt-3">
                            {movie.original_title
                              .split(" ")
                              .slice(0, 2)
                              .join(" ")}
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
    </>
  );
};

export default PeopleMovies;
