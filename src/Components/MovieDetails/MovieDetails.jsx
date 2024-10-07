import axios from "axios";
import React, { useEffect } from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allReviews } from "../../ReduxStore/ReviewsSlice";

const MovieDetails = () => {
  const { id } = useParams();
  async function getMovieDetails() {
    try {
      return await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
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

  async function recommendations() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
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

  const { data, isLoading } = useQuery("getMovieDetails", getMovieDetails);
  const { data: recommendationData } = useQuery(
    "recommendations",
    recommendations
  );

  let { reviewsData } = useSelector(function (store) {
    return store.ReviewsReducer;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const timeInHour = Math.floor(data?.data.runtime / 60);
  const timeInMinute = data?.data.runtime - timeInHour * 60;

  useEffect(() => {
    dispatch(allReviews(id));
  }, [dispatch, id]);

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

  if (reviewsData?.length === 0) {
    reviewsData = null;
  }

  return (
    <>
      <div className="container-fluid pb-5">
        <div className="row bg-dark p-5">
          <div className="col-sm-5 col-md-3 p-0">
            <img
              src={`https://image.tmdb.org/t/p/original${data.data.poster_path}`}
              className="w-100 h-100 rounded-start-1"
              alt={`${data.data.original_title}`}
            />
          </div>
          
          <div
            className="col-sm-7 col-md-9 p-0"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original${data.data.backdrop_path}")`,
              backgroundSize: "cover",
            }}
          >
            <div className="detailsLayer w-100 h-100 p-3">
              <h4 className="text-white fw-bold mb-4">
                {data.data.original_title} ({data.data.release_date.slice(0, 4)}
                )
              </h4>

              <div className="d-flex align-items-center mb-2">
                <div className="border border-1 border-white p-1 me-2">
                  <i className="fa-solid fa-r text-white"></i>
                </div>
                <h6 className="text-white">
                  {data.data.release_date} ({data.data.origin_country}){" "}
                </h6>
              </div>

              <div className="row mb-2">
                {data.data.genres.map((genres) => (
                  <div
                    style={{ width: "fit-content" }}
                    className="text-white p-1"
                  >
                    {genres.name}
                  </div>
                ))}
              </div>

              <h6 className="text-white">
                {timeInHour + "h " + timeInMinute + "m"}
              </h6>

              <p className="text-secondary fw-semibold mt-3 mb-1">
                {data.data.tagline}
              </p>
              <h6 className="text-white fw-bold">Overview</h6>
              <p className="text-white">{data.data.overview}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="fw-bold">Reviews</h4>

          <Link to={`/Reviews/${id}`} className="Link my-0 fw-semibold">
            Show all reviews <i className="fa-solid fa-angle-right"></i>
          </Link>
        </div>

        <div>
          <div className="row px-2">
            {reviewsData !== null ? (
              <div className="review rounded-3 my-3 p-3">
                <div className="row">
                  <div className="col-2 col-md-1">
                    {reviewsData[0]?.author_details.avatar_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${reviewsData[0]?.author_details.avatar_path}`}
                        className="w-100"
                        alt=""
                      />
                    ) : (
                      <img
                        src={require("../../images/profile.png")}
                        className="w-100"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="col-10">
                    <Link
                      target="_blank"
                      to={reviewsData[0]?.url}
                      className="text-decoration-none Link fw-bold fs-5"
                    >
                      A review by {reviewsData[0]?.author}
                    </Link>
                    <div
                      style={{
                        width: "60px",
                        height: "30px",
                        fontSize: "12px",
                      }}
                      className="bg-main rounded-1 text-white fw-bold d-flex align-items-center justify-content-center"
                    >
                      <i className="fa-solid fa-star me-1"></i>
                      {reviewsData[0]?.author_details.rating * 10}%
                    </div>
                  </div>
                </div>
                <p className="m-0 pt-3">
                  Reviews:{" "}
                  {reviewsData[0]?.content.split(" ").slice(0, 50).join(" ")}{" "}
                  ...
                </p>
                <Link target="_blank" to={reviewsData[0]?.url} className="Link">
                  read full review.
                </Link>
              </div>
            ) : (
              <div className="review rounded-3 my-3 p-3">
                <div className="row py-5 align-items-center justify-content-center">
                  <h5 className="fw-bold text-center">No reviews</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-main my-5">
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold text-white">Recommendations</h4>
          </div>

          <div className="row">
            {recommendationData?.data.results !== null ? (
              <div className="rounded-3 my-3">
                <div className="row gy-3">
                  {recommendationData?.data.results
                    .slice(0, 6)
                    .filter((item) => item.poster_path !== null)
                    .map((movie, index) => (
                      <div key={index} className="col-6 col-sm-4 col-md-2">
                        <div
                          className="p-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(`/MovieDetails/${movie.id}`);
                            window.location.reload();
                          }}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            className="w-100"
                            alt=""
                          />
                          <h5 className="mt-3 text-white">
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

export default MovieDetails;
