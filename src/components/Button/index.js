import React from "react";

import "./index.css";

const Button = ({ children, className, ...rest }) => {
  return (
    <button className={`btn ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
