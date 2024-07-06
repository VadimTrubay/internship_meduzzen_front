import React from "react";
import {NavLink} from "react-router-dom";
import Text from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./UserMenu.module.css";

const UserMenu: React.FC = () => {

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}/>
      <Text>Welcome, </Text>
      <Text className={styles.username + " " + styles.nav_link}></Text>
      <NavLink
        className={styles.nav_link}
        to={"/login"}
        onClick={() => {
        }}
      >
        {" "}
        Logout
      </NavLink>
    </div>
  );
};

export default UserMenu;
