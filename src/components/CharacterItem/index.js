import React from "react";

import "./index.css";

const CharacterItem = ({ data, style, key }) => {
  const { image, name } = data;
  return (
    <div className={`character ${style}`}>
      <img className="character__img" src={image} alt={name} />
      <p className="character__txt">{name}</p>
    </div>
  );
};

export default CharacterItem;
