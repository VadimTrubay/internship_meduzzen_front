import React from "react";
import {NavLink} from "react-router-dom";
import {LoginButton} from "../LoginButton/LoginButton";
import {RegisterButton} from "../RegisterButton/RegisterButton";
import styles from "./AuthNav.module.css";
import {mainUrls} from "../../config/urls";

const AuthNav: React.FC = () => {
  return (
    <div>
      <NavLink className={styles.nav_link} to={mainUrls.auth.signup}>
        <RegisterButton/>
      </NavLink>
      <NavLink className={styles.nav_link} to={mainUrls.auth.login}>
        <LoginButton/>
      </NavLink>
    </div>
  );
};

export default AuthNav;
