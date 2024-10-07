import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allReviews } from "../../ReduxStore/ReviewsSlice";
import { Link, useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams();
  const { reviewsData } = useSelector(function (store) {
    return store.ReviewsReducer;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allReviews(id));
  }, [dispatch, id]);

  if (reviewsData?.length === 0) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <h2 className="fw-bold">No reviews</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="d-flex align-items-center justify-content-start">
          <h3 className="fw-bold bg-primary text-white py-2 px-5 my-3 rounded-2 m-auto">
            Reviews
          </h3>
        </div>
        {reviewsData?.map((item, index) => (
          <div key={index} className="review rounded-3 my-3 p-3">
            <div className="row">
              <div className="col-2 col-md-1">
                {item.author_details.avatar_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`}
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
              <div className="col-md-10">
                <Link
                  target="_blank"
                  to={item.url}
                  className="text-decoration-none Link fw-bold fs-5"
                >
                  A review by {item.author}
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
                  {item.author_details.rating * 10}%
                </div>
              </div>
            </div>
            <p className="m-0 pt-3">
              Reviews: {item.content.split(" ").slice(0, 50).join(" ")} ...
            </p>
            <Link target="_blank" to={item.url} className="Link">
              read full review.
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reviews;
