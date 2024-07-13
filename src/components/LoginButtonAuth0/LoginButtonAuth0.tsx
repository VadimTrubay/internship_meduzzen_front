import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { loginAuth0 } from "../../redux/auth/slice";
import styles from "./LoginButtonAuth0.module.css";

export const LoginButtonAuth0 = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      handleChange();
    }
  }, [isAuthenticated]);

  const handleChange = () => {
    dispatch(loginAuth0(true));
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <Box className={styles.container}>
        <Button
          className="auth login"
          onClick={handleLogin}
          variant="contained"
        >
          Auth0 login
        </Button>
      </Box>
    </div>
  );
};
