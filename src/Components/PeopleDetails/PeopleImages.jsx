import axios from "axios";
import React from "react";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PeopleImages = () => {
  const { id } = useParams();
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

  const { data, isLoading } = useQuery("PeopleImges", getPeopleImges);

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
            Images
          </h3>
        </div>
        <div>
          <div className="row">
            {data?.data.profiles !== null ? (
              <div className="rounded-3 my-3 p-3">
                <div className="row gy-3">
                  {data?.data.profiles.map((img, index) => (
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
    </>
  );
};

export default PeopleImages;
