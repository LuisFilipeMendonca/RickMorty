import React from "react";

import "./index.css";

import CardItem from "../../components/CardItem";

const Grid = ({ data }) => {
  return (
    <div className="grid">
      {data.map((character) => (
        <CardItem
          key={character.id}
          image={character.image}
          name={character.name}
        />
      ))}
    </div>
  );
};

export default Grid;
