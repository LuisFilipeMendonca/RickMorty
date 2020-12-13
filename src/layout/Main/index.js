import React from "react";

import "./index.css";

import Carousel from "../../components/Carousel";
import CharacterItem from "../../components/CharacterItem";

const Main = ({ data }) => {
  return (
    <main className="main">
      <Carousel dataArr={data} item={<CharacterItem />} />
    </main>
  );
};

export default Main;
