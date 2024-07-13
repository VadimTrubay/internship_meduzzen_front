import React from "react";
import Text from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./UserMenu.module.css";
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {useAuth0} from "@auth0/auth0-react";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";

const UserMenu: React.FC = () => {
  const {user} = useAuth0();
  const selectedUser = useSelector(selectUser);


  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} alt="avatar" src={user?.picture}/>
      <div className={styles.userinfo}>
        <Text className={styles.username}>{user ? user.name : selectedUser?.username}</Text>
        <Text className={styles.email}>{user ? user.email : selectedUser?.email}</Text>
      </div>
      <LogoutButton/>
    </div>
  );
};

export default UserMenu;
