import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const People = () => {
  const [pageNum, setPageNum] = useState(1);

  async function popular() {
    try {
      return await axios.get(
        `https://api.themoviedb.org/3/person/popular?page=${pageNum}`,
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

  const [searchList, setSearchList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery("popular", popular);

  useEffect(() => {
    if (data) {
      setSearchList(data?.data.results);
    }
  }, [data]);

  useEffect(() => {
    async function search() {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/person`,
          {
            params: { query: searchInput },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWJmM2E4NWYyNDhlY2ExMTNiYmRlYWNkODkzYWQ2NiIsIm5iZiI6MTcyNDQ4NjI3Ny42NDA5NzUsInN1YiI6IjY1OGNhNTc0MWJmODc2MDQ4MDZlNzlhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2a3JiBBjZDUQXP4FlPhwWvF-GbaauUr8_dF6JGPmvM",
            },
          }
        );
        setSearchList(data.results);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (searchInput) {
      search();
    } else {
      setSearchList(data?.data.results);
    }
  }, [searchInput, data?.data.results]);

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
              id="search"
              className="form-control me-3"
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
                People
              </button>
              <ul
                className="dropdown-menu bg-main px-2"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <button className="dropdown-item text-white">
                    Popular People
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <h5 className="mb-3 fw-bold p-2 rounded-3">Popular people</h5>
          <div className="row gy-4">
            {searchList
              ?.filter((item) => item.profile_path != null)
              .map((item, index) => (
                <div
                  onClick={() => {
                    navigate(`/PeopleDetails/${item.id}`);
                  }}
                  key={index}
                  className="col-sm-6 col-md-3 col-xl-2"
                >
                  <div className="movie rounded-2">
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                      className="card-img-top rounded-top-2"
                      alt="..."
                    />
                    <div className="card-body p-2">
                      <p className="mb-0">{item.known_for_department}</p>
                      <h6 className="card-title fw-semibold">
                        {item.name?.split(" ").slice(0, 2).join(" ")}
                      </h6>
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
                refetch();
              }}
            >
              <button className="page-link">1</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(2);
                refetch();
              }}
            >
              <button className="page-link">2</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(3);
                refetch();
              }}
            >
              <button className="page-link">3</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(4);
                refetch();
              }}
            >
              <button className="page-link">4</button>
            </li>
            <li
              className="page-item"
              onClick={async () => {
                await setPageNum(5);
                refetch();
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

export default People;
