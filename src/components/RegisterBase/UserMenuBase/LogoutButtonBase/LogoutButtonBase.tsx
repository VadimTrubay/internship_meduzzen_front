import React from "react";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import styles from "../UserMenuBase.module.css";
import {logOut} from "../../../../redux/auth/operations";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../redux/store";


export const LogoutButtonBase = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <NavLink
      className={styles.nav_link}
      to={"/login"}
      onClick={() => dispatch(logOut())}
    >
      <Button variant="contained">Logout</Button>
    </NavLink>
  )
}