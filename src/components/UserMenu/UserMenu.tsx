import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Text from "@mui/material/Box";
import {useAuth0} from "@auth0/auth0-react";
import {LogoutButton} from "../LogoutButton/LogoutButton";
import {selectUser} from "../../redux/auth/selectors";
import {authType} from "../../types/authTypes";
import {getMe} from "../../redux/auth/operations";
import styles from "./UserMenu.module.css";
import {AppDispatch} from "../../redux/store";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useAuth0();
  const selectedUser: authType = useSelector(selectUser);

  useEffect(() => {
    dispatch(getMe());
  }, [selectedUser])

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
