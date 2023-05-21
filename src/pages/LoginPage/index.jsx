import css from "./index.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";
import LoginForm from "./LoginForm";
import useAxios from "../../api/useAxios";
import useDatastore from "../../datastore/useDatastore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const axios = useAxios();
  const { setAccessToken, setUser } = useDatastore();
  const { addMessage } = useDatastore();
  const navigate = useNavigate();
  const [isError, setError] = useState(false);

  function onLoginAttempt(username, password) {
    axios
      .post("/api/users/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          setAccessToken(response.data.token);
          setUser(response.data.user);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response) {
          const status = error.response.status;
          switch (status) {
            case 400:
              addMessage(
                "error",
                "Something wrong happened with your request!"
              );
              break;
            case 401:
              setError(true);
              break;
            case 404:
              addMessage("error", "Target resource was not found!");
              break;
            case 500:
              addMessage("error", "Some unexpected error occurred on server!");
              break;
            case 504:
              addMessage("error", "Your request timed out!");
              break;
          }
        }
      });
  }
  return (
    <DefaultLayout>
      <div className={css.alignmentWrapper}>
        <LoginForm onLoginAttempt={onLoginAttempt} isError={isError} />
      </div>
    </DefaultLayout>
  );
}

export default LoginPage;
