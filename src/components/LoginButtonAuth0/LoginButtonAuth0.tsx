import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./LoginButtonAuth0.module.css";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { loginAuth0 } from "../../redux/auth/slice";

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

  return (
    <Box className={styles.container}>
      <Button className='auth login'
        onClick={loginWithRedirect}
        variant="contained"
      >
        Auth0 login
      </Button>
    </Box>
  );
};

