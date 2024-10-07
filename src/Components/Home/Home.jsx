import React from "react";
import MovieSlider from "../MovieSlider/MovieSlider";
import MoviesPostersSlider from "../MoviesPostersSlider/MoviesPostersSlider";
import TrendingPeopleSlider from "../TrendingPeopleSlider/TrendingPeopleSlider";
import TrendingTvSlider from "../TrendingTvSlider/TrendingTvSlider";

const Home = () => {
  return (
    <>
      <MovieSlider />
      <MoviesPostersSlider />
      <TrendingPeopleSlider />
      <TrendingTvSlider />
    </>
  );
};

export default Home;
