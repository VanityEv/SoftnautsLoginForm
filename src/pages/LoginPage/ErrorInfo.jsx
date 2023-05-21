import React from "react";
import css from "./LoginForm.module.scss";
import errorIcon from "../../assets/shapes/errorIcon.svg";

export const ErrorInfo = ({ isError }) => {
  return (
    <div
      className={css.errorLine}
      style={{ display: isError ? "flex" : "none" }}
    >
      <img src={errorIcon} />
      <p className={css.errorText}>Incorrect username or password</p>
    </div>
  );
};
