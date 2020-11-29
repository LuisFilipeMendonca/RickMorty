import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Header from "./layout/Header";
import Pagination from "./layout/Pagination";

const App = () => {
  const [data, setData] = useState([]);
  const [dataAmount, setDataAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchChangeHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios(
        `https://rickandmortyapi.com/api/character/?name=${e.target.value}`
      );
      setData(response.data.results);
      setDataAmount(response.data.info.count);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const pageChangeHandler = (value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://rickandmortyapi.com/api/character/"
        );

        setData(response.data.results);
        setDataAmount(response.data.info.count);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <Header searchChangeHandler={searchChangeHandler} />
      {isLoading ? (
        <div className="loading-container">Loading</div>
      ) : (
        <div className="grid">
          {data.map((character) => (
            <div key={character.id} className="item">
              <img className="item__img" src={character.image} />
              <p className="item__name">{character.name}</p>
            </div>
          ))}
        </div>
      )}
      <Pagination
        dataAmount={dataAmount}
        currentPage={currentPage}
        dataPerPage={20}
        paginationQtty={5}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default App;
