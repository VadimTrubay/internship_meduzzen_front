import React from "react";
import Button from "@mui/material/Button";
import styles from "../UserMenu/UserMenu.module.css";
import {useAuth0} from "@auth0/auth0-react";
import {logOut} from "../../redux/auth/operations";
import {useDispatch} from "react-redux";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const {logout, isAuthenticated} = useAuth0();

  const handleAuth0Logout = () => {
    logout({returnTo: window.location.origin} as any);
  };

  const handleBaseLogout = () => {
    dispatch(logOut() as any)
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