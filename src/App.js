import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [dataAmount, setDataAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputChangeHandler = (e) => setInputValue(e.target.value);

  const searchCharacterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios(
        `https://rickandmortyapi.com/api/character/?name=${inputValue}`
      );
      setCharacters(response.data.results);
      setDataAmount(response.data.info.count);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios(
          "https://rickandmortyapi.com/api/character/"
        );

        setCharacters(response.data.results);
        setDataAmount(response.data.info.count);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(dataAmount);

  return (
    <div className="wrapper">
      <div className="filters">
        <form className="form" onSubmit={searchCharacterHandler}>
          <input
            className="form__input"
            type="text"
            placeholder="Search your favorite character"
            value={inputValue}
            onChange={inputChangeHandler}
          />
          <button type="submit" onClick={searchCharacterHandler}>
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="loading-container">Loading</div>
      ) : (
        <div className="grid">
          {characters.map((character) => (
            <div key={character.id} className="item">
              <img className="item__img" src={character.image} />
              <p className="item__name">{character.name}</p>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">Pagination</div>
    </div>
  );
};

export default App;
