import React, { useState, useRef, useEffect } from "react";

import "./index.css";

import CardItem from "../../components/CardItem";

const Main = ({ data }) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [windowLength, setWindowLength] = useState(window.innerWidth);
  const [initialValue, setInitialValue] = useState(
    window.innerWidth > 576 ? 10 : 5
  );
  const carouselRef = useRef();
  const translationValue = windowLength > 576 ? 20 : 25;

  const nextHandler = () => {
    setCurrentItem(currentItem + 1);
  };

  const prevHandler = () => {
    setCurrentItem(currentItem - 1);
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
  }, [window]);

  return (
    <main className="main">
      <div className="carousel">
        <button
          className="btn__carousel btn__carousel--prev"
          onClick={prevHandler}
          disabled={currentItem === 0}
        >
          Prev
        </button>
        <button
          className="btn__carousel btn__carousel--next"
          onClick={nextHandler}
          disabled={
            windowLength > 576
              ? currentItem >= data.length - 2
              : currentItem === data.length - 1
          }
        >
          Next
        </button>
        <div className="carousel__outter">
          <div
            className="carousel__inner"
            ref={carouselRef}
            style={{ transform: `translateX(-${initialValue}%)` }}
          >
            <div className="carousel__item"></div>
            {data.map((character, index) => (
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
                <img className="carousel__img" src={character.image} />
                <p className="carousel__txt">{character.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
