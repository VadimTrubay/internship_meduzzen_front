import React from "react";
import {NavLink} from "react-router-dom";
import Text from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import styles from "./UserMenu.module.css";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import {logOut} from "../../redux/auth/operations";
import {AppDispatch} from "../../redux/store";

const UserMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar}/>
      <Text>Welcome, user </Text>
      <Text className={styles.username + ' ' + styles.nav_link}>{user.username}</Text>
      <NavLink
        className={styles.nav_link}
        to={"/login"}
        onClick={() => dispatch(logOut())}
      >
        {" "}
        Logout
      </NavLink>
    </div>
  );
};

export default UserMenu;
