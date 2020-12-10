import React from "react";

import "./index.css";

const CarouselItem = ({ windowLength, currentItem, index, data }) => {
  const { image, name } = data;
  return (
    <div
      className={
        windowLength > 576
          ? index >= currentItem && index <= currentItem + 1
            ? "carousel__item carousel__item--selected"
            : "carousel__item"
          : index === currentItem
          ? "carousel__item carousel__item--selected"
          : "carousel__item"
      }
    >
      <img className="carousel__img" src={image} />
      <p className="carousel__txt">{name}</p>
    </div>
  );
};

export default CarouselItem;
