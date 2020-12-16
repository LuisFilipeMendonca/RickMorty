import React, { useState, useEffect, useRef } from "react";

import "./index.css";

import Button from "../Button";

const defineStyleClass = (windowLength, currentItem, index) => {
  return windowLength > 576
    ? index >= currentItem && index <= currentItem + 1
      ? "carousel__item carousel__item--selected"
      : "carousel__item"
    : index === currentItem
    ? "carousel__item carousel__item--selected"
    : "carousel__item";
};

const Carousel = ({ item, dataArr }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [windowLength, setWindowLength] = useState(window.innerWidth);
  const [initialValue, setInitialValue] = useState(
    window.innerWidth > 576 ? 10 : 5
  );
  const carouselRef = useRef();
  const translationValue = windowLength > 576 ? 20 : 25;

  const moveHandler = (value) => {
    const newValue = currentItem + value;
    setCurrentItem(newValue);
  };

  const carouselMove = () => {
    const translation = initialValue + currentItem * translationValue;

    carouselRef.current.style.transform = `translateX(-${translation}%)`;
  };

  useEffect(() => {
    carouselMove();
  }, [currentItem, initialValue]);

  useEffect(() => {
    const resized = () => {
      setWindowLength(window.innerWidth);
      setInitialValue(window.innerWidth > 576 ? 10 : 5);
    };

    window.addEventListener("resize", resized);

    return () => window.removeEventListener("resize", resized);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel__outter">
        <div
          className="carousel__inner"
          ref={carouselRef}
          style={{ transform: `translateX(-${initialValue}%)` }}
        >
          <div className="carousel__item"></div>
          {dataArr.map((data, index) =>
            React.cloneElement(item, {
              style: defineStyleClass(windowLength, currentItem, index),
              data: data,
              key: data.id,
            })
          )}
        </div>
      </div>
      <div className="carousel__btns">
        <Button
          className="btn__carousel btn__carousel--prev"
          onClick={() => moveHandler(-1)}
          disabled={currentItem === 0}
        >
          <span>&#8592;</span>
          Prev
        </Button>
        <Button
          className="btn__carousel btn__carousel--next"
          onClick={() => moveHandler(1)}
          disabled={
            windowLength > 576
              ? currentItem >= dataArr.length - 2
              : currentItem === dataArr.length - 1
          }
        >
          Next
          <span>&#8594;</span>
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
