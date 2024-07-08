import React from "react";
import Avatar from "@mui/material/Avatar";
import styles from "./UserMenuAuth0.module.css";
import {LogoutButtonAuth0} from "./LogoutButtonAuth0/LogoutButtonAuth0";

const UserMenuAuth0: React.FC = () => {

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}/>
      <div className={styles.userinfo}>
        {/*<Text className={styles.username + ' ' + styles.nav_link}>{user.username}</Text>*/}
        {/*<Text className={styles.username + ' ' + styles.nav_link}>{user.email}</Text>*/}
      </div>
      <LogoutButtonAuth0/>
    </div>
  );
};

export default UserMenuAuth0;
