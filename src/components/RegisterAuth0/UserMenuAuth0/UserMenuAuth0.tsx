import React from "react";
import Avatar from "@mui/material/Avatar";
import Text from "@mui/material/Box";
import styles from "./UserMenuAuth0.module.css";
import {LogoutButtonAuth0} from "./LogoutButtonAuth0/LogoutButtonAuth0";
import {useAuth0} from "@auth0/auth0-react";

const UserMenuAuth0: React.FC = () => {
  const {user} = useAuth0()

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}/>
      <div className={styles.userinfo}>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.name}</Text>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.email}</Text>
      </div>
      <LogoutButtonAuth0/>
    </div>
  );
};

export default UserMenuAuth0;
