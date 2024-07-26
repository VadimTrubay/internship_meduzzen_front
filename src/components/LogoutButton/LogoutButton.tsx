import React from "react";
import Button from "@mui/material/Button";
import {useAuth0} from "@auth0/auth0-react";
import {logOut} from "../../redux/auth/operations";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "../UserMenu/UserMenu.module.css";

export const LogoutButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {logout, isAuthenticated} = useAuth0();

  const handleAuth0Logout = () => {
    logout({returnTo: window.location.origin});
  };

  const handleBaseLogout = () => {
    dispatch(logOut())
  }

  return (
    isAuthenticated ? (
      <Button
        className={styles.logout_button}
        variant="contained"
        onClick={handleAuth0Logout}
      >
        Logout Auth0
      </Button>
    ) : (
      <Button
        className={styles.logout_button}
        variant="contained"
        onClick={handleBaseLogout}
      >
        Logout
      </Button>
    )
  );
};
