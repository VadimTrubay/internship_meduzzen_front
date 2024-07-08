import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./AuthNavBase.module.css";
import {LoginButtonBase} from "./LoginButtonBase/LoginButtonBase";
import {RegisterButtonBase} from "./RegisterButtonBase/RegisterButtonBase";

const AuthNavBase: React.FC = () => {
  return (
    <div className={styles.container}>
      <NavLink className={styles.nav_link} to={"/register"}>
        <RegisterButtonBase/>
      </NavLink>
      <NavLink className={styles.nav_link} to={"/login"}>
        <LoginButtonBase/>
      </NavLink>
    </div>
  );
};

export default AuthNavBase;
