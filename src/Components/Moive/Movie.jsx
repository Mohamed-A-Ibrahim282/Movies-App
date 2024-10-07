import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNum, setPageNum] = useState(1);

  async function popular() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${pageNum}`,
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

  async function nowPlaying() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?page=${pageNum}`,
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

  async function Upcoming() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?page=${pageNum}`,
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

  async function topRated() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?page=${pageNum}`,
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

  const {
    data: popularData,
    isLoading,
    refetch: refetchPopular
  } = useQuery("popular", popular);

  const { data: nowPlayingData, refetch: refetchNowPlaying } = useQuery(
    "nowPlaying",
    nowPlaying
  );

  const { data: UpcomingData, refetch: refetchUpcoming } = useQuery(
    "Upcoming",
    Upcoming
  );

  const { data: topRatedData, refetch: refetchTopRated } = useQuery(
    "topRated",
    topRated
  );

  const [list, setList] = useState(popularData?.data.results);
  const [title, setTitle] = useState("Popular Movies");
  const navigate = useNavigate();

  useEffect(() => {
    async function search() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: { query: searchInput },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
            },
          }
        );
        setList(data.results);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (searchInput) {
      search();
    } else {
      if (title === "Popular Movies") {
        setList(popularData?.data.results);
      } else if (title === "Now Playing Movies") {
        setList(nowPlayingData?.data.results);
      } else if (title === "Upcoming Movies") {
        setList(UpcomingData?.data.results);
      } else if (title === "Top Rated Movies") {
        setList(topRatedData?.data.results);
      }
    }
  }, [
    searchInput,
    popularData?.data.results,
    nowPlayingData?.data.results,
    UpcomingData?.data.results,
    topRatedData?.data.results,
    title,
  ]);

  useEffect(() => {
    if (popularData) {
      setList(popularData?.data.results);
    }
  }, [popularData]);

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
      <div className="container p-5">
        <div className="container">
          <div className="d-flex mb-5">
            <input
              type="search"
              placeholder="search..."
              className="form-control me-3"
              id="search"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <div className="dropdown">
              <button
                className="btn bg-main text-white dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movie
              </button>
              <ul
                className="dropdown-menu bg-main px-2"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button
                    onClick={async() => {
                      await setPageNum(1);
                      refetchPopular()
                      setList(popularData?.data.results);
                      setTitle("Popular Movies");
                    }}
                    className="dropdown-item text-white"
                  >
                    Popular
                  </button>
                </li>
                <li>
                  <button
                    onClick={async() => {
                      await setPageNum(1);
                      refetchNowPlaying()
                      setList(nowPlayingData?.data.results);
                      setTitle("Now Playing Movies");
                    }}
                    className="dropdown-item text-white"
                  >
                    Now Playing
                  </button>
                </li>
                <li>
                  <button
                    onClick={async() => {
                      await setPageNum(1);
                      refetchUpcoming()
                      setList(UpcomingData?.data.results);
                      setTitle("Upcoming Movies");
                    }}
                    className="dropdown-item text-white"
                  >
                    Upcoming
                  </button>
                </li>
                <li>
                  <button
                    onClick={async() => {
                      await setPageNum(1);
                      refetchTopRated()
                      setList(topRatedData?.data.results);
                      setTitle("Top Rated Movies");
                    }}
                    className="dropdown-item text-white"
                  >
                    Top Rated
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h5 className="mb-3 fw-bold p-2 rounded-3">{title}</h5>
          <div className="row gy-4">
            {list
              ?.filter((item) => item.poster_path != null)
              .map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/MovieDetails/${item.id}`);
                  }}
                  key={index}
                  className="col-sm-6 col-md-3 col-xl-2"
                >
                  <div className="movie rounded-2">
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                      className="card-img-top rounded-top-2"
                      alt="..."
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title fw-semibold">
                        {item.title?.split(" ").slice(0, 2).join(" ")}
                      </h6>
                      <p>{item.release_date}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <nav
          aria-label="Page navigation example"
          className="d-flex align-items-center justify-content-center mt-5"
        >
          <ul className="pagination m-0">
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(1);
                if (title === "Popular Movies") {
                  refetchPopular();
                } else if (title === "Now Playing Movies") {
                  refetchNowPlaying();
                } else if (title === "Upcoming Movies") {
                  refetchUpcoming();
                } else if (title === "Top Rated Movies") {
                  refetchTopRated();
                }
              }}
            >
              <button className="page-link">1</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(2);
                if (title === "Popular Movies") {
                  refetchPopular();
                } else if (title === "Now Playing Movies") {
                  refetchNowPlaying();
                } else if (title === "Upcoming Movies") {
                  refetchUpcoming();
                } else if (title === "Top Rated Movies") {
                  refetchTopRated();
                }
              }}
            >
              <button className="page-link">2</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(3);
                if (title === "Popular Movies") {
                  refetchPopular();
                } else if (title === "Now Playing Movies") {
                  refetchNowPlaying();
                } else if (title === "Upcoming Movies") {
                  refetchUpcoming();
                } else if (title === "Top Rated Movies") {
                  refetchTopRated();
                }
              }}
            >
              <button className="page-link">3</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(4);
                if (title === "Popular Movies") {
                  refetchPopular();
                } else if (title === "Now Playing Movies") {
                  refetchNowPlaying();
                } else if (title === "Upcoming Movies") {
                  refetchUpcoming();
                } else if (title === "Top Rated Movies") {
                  refetchTopRated();
                }
              }}
            >
              <button className="page-link">4</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(5);
                if (title === "Popular Movies") {
                  refetchPopular();
                } else if (title === "Now Playing Movies") {
                  refetchNowPlaying();
                } else if (title === "Upcoming Movies") {
                  refetchUpcoming();
                } else if (title === "Top Rated Movies") {
                  refetchTopRated();
                }
              }}
            >
              <button className="page-link">5</button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Movie;
