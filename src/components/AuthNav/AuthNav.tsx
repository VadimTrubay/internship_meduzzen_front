import React from "react";
import {NavLink} from "react-router-dom";
import {Breadcrumbs} from "@mui/material";
import styles from "./AuthNav.module.css";

const AuthNav: React.FC = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs sx={{"& .MuiBreadcrumbs-separator": {color: "white"}}} aria-label="breadcrumb">
        <NavLink className={styles.nav_link} to={"/register"}>
          Register
        </NavLink>
        <NavLink className={styles.nav_link} to={"/login"}>
          Login
        </NavLink>
      </Breadcrumbs>
    </div>
  );
};

export default AuthNav;
