import React from "react";

import "./index.css";

const CardItem = ({ image, name }) => {
  return (
    <div className="item">
      <img className="item__img" src={image} alt={name} />
      <p className="item__name">{name}</p>
    </div>
  );
};

export default CardItem;
