import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import styles from "./User.module.css";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/usersTypes";

const User = ({ user }: { user: UserType }) => {
  const handleGetUser = (userId: number) => {
    console.log(userId); // Example action with userId
    // You can perform other actions here, like navigation
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{ padding: "3px" }}>
        <Avatar className={styles.avatar} />
      </TableCell>
      <NavLink
        className={styles.link}
        to={`/user/${user.id}`} // Example link to user detail page
        onClick={() => handleGetUser(user.id)} // Pass userId to handler
      >
        <TableCell sx={{ padding: "3px" }} align="center">
          {user.username}
        </TableCell>
      </NavLink>
      <TableCell sx={{ padding: "3px" }} align="center">
        {user.email}
      </TableCell>
    </>
  );
};

export default User;
