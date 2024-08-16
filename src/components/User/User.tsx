import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import {NavLink} from "react-router-dom";
import styles from "./User.module.css";
import {mainUrls} from "../../config/urls";
import {UserProps} from "../../types/usersTypes";


const User: React.FC<UserProps> = ({user}) => {

  return (
    <>
      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
        <Avatar className={styles.avatar}/>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        <NavLink className={styles.link} to={mainUrls.users.byId(user?.id)}>
          {user?.username}
        </NavLink>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        {user?.email}
      </TableCell>
    </>
  );
};

export default User;
