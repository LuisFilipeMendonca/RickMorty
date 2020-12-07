import React, { useState } from "react";

import "./App.css";

import Header from "./layout/Header";
import Pagination from "./layout/Pagination";
import Main from "./layout/Main";

import useFetchData from "./hooks/useFetchData";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [characterSearch, setCharacterSearch] = useState("");
  const [query, setQuery] = useState("");

  const [data, dataAmount, isLoading, error] = useFetchData(query);

  const searchChangeHandler = (e) => {
    e.preventDefault();
    setCharacterSearch(e.target.value);
    setCurrentPage(1);
    setQuery(`?name=${e.target.value}&page=1`);
  };

  const pageChangeHandler = (value) => {
    const query =
      characterSearch.length > 0
        ? `?name=${characterSearch}&page=${value}`
        : `?page=${value}`;
    setCurrentPage(value);
    setQuery(query);
  };

  return (
    <div className="wrapper">
      <Header searchChangeHandler={searchChangeHandler} />
      {isLoading && <div className="loading-container">Loading</div>}
      {error && !isLoading && <div className="loading-container">{error}</div>}
      {data.length > 0 && !isLoading && <Main data={data} />}
      <Pagination
        dataAmount={dataAmount}
        currentPage={currentPage}
        dataPerPage={20}
        paginationQtty={4}
        pageChangeHandler={pageChangeHandler}
      />
    </div>
  );
};

export default App;
