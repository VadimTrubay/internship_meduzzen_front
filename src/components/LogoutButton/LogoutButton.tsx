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

  const handleBaseLogout = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
      dispatch(logOut());
    } else {
      dispatch(logOut());
    }
  }

  return (
      <Button
        className={styles.logout_button}
        variant="contained"
        onClick={handleBaseLogout}
      >
        Logout
      </Button>
  );
};
