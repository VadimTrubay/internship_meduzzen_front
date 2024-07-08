import React from "react";
import Text from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useSelector} from "react-redux";
import {selectUser} from "../../../redux/auth/selectors";
import styles from "./UserMenuBase.module.css";
import {LogoutButtonBase} from "./LogoutButtonBase/LogoutButtonBase";

const UserMenuBase: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}/>
      <div className={styles.userinfo}>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.username}</Text>
        <Text className={styles.username + ' ' + styles.nav_link}>{user?.email}</Text>
      </div>
      <LogoutButtonBase/>
    </div>
  );
};

export default UserMenuBase;
