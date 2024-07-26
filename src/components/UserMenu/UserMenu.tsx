import React from "react";
import {useSelector} from "react-redux";
import Text from "@mui/material/Box";
import {useAuth0} from "@auth0/auth0-react";
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {selectUser} from "../../redux/auth/selectors";
import {authType} from "../../types/authTypes";
import styles from "./UserMenu.module.css";

const UserMenu: React.FC = () => {
  const {user} = useAuth0();
  const selectedUser: authType = useSelector(selectUser);


  return (
    <div className={styles.container}>
      <div className={styles.userinfo}>
        <Text className={styles.username}>{user ? user.name : selectedUser?.username}</Text>
        <Text className={styles.email}>{user ? user.email : selectedUser?.email}</Text>
      </div>
      <LogoutButton/>
    </div>
  );
};

export default UserMenu;
