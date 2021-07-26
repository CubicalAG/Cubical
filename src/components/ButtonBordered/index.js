import React from "react";

import styles from "./button-bordered.module.scss";

const ButtonBordered = ({ children, onClick, className }) => {
  return (
    <button
      className={`${styles.buttonBordered} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBordered;
