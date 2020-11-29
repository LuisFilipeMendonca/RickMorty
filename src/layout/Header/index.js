import React from "react";

import "./index.css";

import Input from "../../components/Input";

const Header = ({ searchChangeHandler }) => {
  return (
    <header className="header">
      <h1 className="header__title">Rick and Morty</h1>
      <div className="header__input">
        <Input
          onChange={searchChangeHandler}
          placeholder="Search your favorite character"
        />
      </div>
    </header>
  );
};

export default Header;
