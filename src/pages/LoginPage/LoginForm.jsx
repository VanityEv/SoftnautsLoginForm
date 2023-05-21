import css from "./LoginForm.module.scss";
import Panel from "../../components/Panel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { ErrorInfo } from "./ErrorInfo";

function LoginForm({ onLoginAttempt, isError }) {
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /**
   * Handles change focus from email field to password field.
   * Alternatively, sends request onLoginAttempt if "enter" was pressed on password field
   * @param {*} event - pressed key
   */
  const changeFocus = (event) => {
    if (
      event.key === "Enter" &&
      document.activeElement === passwordRef.current
    ) {
      onLoginAttempt(email, password);
    } else if (event.key === "Enter") {
      event.preventDefault();
      passwordRef.current.focus();
    }
  };

  //Form handlers used only in this component

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = () => {
    if (email !== "" && password != "") onLoginAttempt(email, password);
  };

  /* onSubmit function in form field prevents page from reloading */
  return (
    <Panel className={css.loginForm}>
      <form
        className={css.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset className={css.fieldset}>
          <legend className={css.legendTypography}>Log in</legend>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className={css.input}
            placeholder="Enter email..."
            onKeyDown={(event) => changeFocus(event)}
            onChange={handleEmailChange}
            style={{ border: isError && "1.5px solid #C94F4F" }}
          />
          <ErrorInfo isError={isError} />
          <div className={css.bundleLabel}>
            <label htmlFor="password" style={{ marginRight: "auto" }}>
              Password
            </label>
            <Link
              to={""}
              style={{ marginLeft: "auto" }}
              aria-labelledby="forgot password"
            >
              Forgot your password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            className={css.input}
            placeholder="Enter password..."
            ref={passwordRef}
            onChange={handlePasswordChange}
            style={{ border: isError && "1.5px solid #C94F4F" }}
          />
          <ErrorInfo isError={isError} />
          <div className={css.submitContainer}>
            <input
              type="submit"
              id="submit"
              value="Log in"
              className={css.loginButton}
              onClick={handleSubmit}
            />
          </div>
        </fieldset>
        <hr />
        <div className={css.bottomLink}>
          <p>Don't have an account yet?</p>
          <Link to={""} aria-labelledby="create account">
            Create account
          </Link>
        </div>
      </form>
    </Panel>
  );
}

LoginForm.propTypes = {
  onLoginAttempt: PropTypes.func.isRequired,
};

export default LoginForm;
