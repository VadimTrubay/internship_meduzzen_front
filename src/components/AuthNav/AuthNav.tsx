import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./AuthNav.module.css";
import {LoginButton} from "../LoginButton/LoginButton";
import {RegisterButton} from "../RegisterButton/RegisterButton";
import {LogoutButton} from "../LogoutButton/LogoutButton";

const AuthNav: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavLink className={styles.nav_link} to={"/register"}>
        <RegisterButton/>
      </NavLink>
      <NavLink className={styles.nav_link} to={"/login"}>
        <LoginButton/>
      </NavLink>
      {/*<LogoutButton/>*/}
    </div>
  );
};

export default AuthNav;
