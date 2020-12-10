import React, { useEffect, useState } from "react";

import "./App.css";

import Header from "./layout/Header";
import Pagination from "./layout/Pagination";
import Main from "./layout/Main";

import useRequest from "./hooks/useRequest";

const App = () => {
  const [characterSearch, setCharacterSearch] = useState("");
  const [query, setQuery] = useState("");

  const [data, isLoading, error, requestHandler] = useRequest();

  const makeRequest = (query) => {
    requestHandler(query);
  };

  useEffect(() => {
    makeRequest("");
  }, []);

  console.log(characterSearch);

  return (
    <div className="wrapper">
      <Header
        makeRequest={makeRequest}
        setCharacterSearch={setCharacterSearch}
      />
      {isLoading && <div className="loading-container">Loading</div>}
      {error && !isLoading && <div className="loading-container">{error}</div>}
      {data && !isLoading && <Main data={data.results} />}
      <Pagination
        dataAmount={data ? data.info.count : 0}
        dataPerPage={20}
        paginationQtty={4}
        makeRequest={makeRequest}
        searchedCharacter={characterSearch}
      />
    </div>
  );
};

export default App;
