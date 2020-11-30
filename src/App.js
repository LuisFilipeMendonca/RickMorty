import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Header from "./layout/Header";
import Pagination from "./layout/Pagination";

const baseUrl = "https://rickandmortyapi.com/api/character/";

const App = () => {
  const [data, setData] = useState([]);
  const [dataAmount, setDataAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setQuery(`?name=${e.target.value}`);
  };

  const pageChangeHandler = (value) => {
    setCurrentPage(value);
    setQuery(`?page=${value}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios(`${baseUrl}${query}`);

        setData(response.data.results);
        setDataAmount(response.data.info.count);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query]);

  console.log(dataAmount);

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
