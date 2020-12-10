import React from "react";

import "./index.css";

import Carousel from "../../components/Carousel";
import CarouselItem from "../../components/CarouselItem";

const Main = ({ data }) => {
  return (
    <main className="main">
      <Carousel dataArr={data} item={<CarouselItem />} />
    </main>
  );
};

export default Main;
