import React from "react";
import Text from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./UserMenu.module.css";
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";

const UserMenu: React.FC = () => {
  const {user} = useAuth0();

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} alt="avatar" src={user?.picture}/>
      <div className={styles.userinfo}>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.name}</Text>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.email}</Text>
      </div>
      <LogoutButton/>
    </div>
  );
};

export default UserMenu;
