import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../types/usersTypes";
import { fetchUserById } from "../../redux/users/operations";
import { useDispatch } from "react-redux";

const User = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGetUser = (userId: number) => {
    dispatch(fetchUserById(userId));
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{ padding: "3px" }}>
        <Avatar className={styles.avatar} />
      </TableCell>
      <TableCell sx={{ padding: "3px" }} align="center">
        <span className={styles.link} onClick={() => handleGetUser(user.id)}>
          {user?.username}
        </span>
      </TableCell>
      <TableCell sx={{ padding: "3px" }} align="center">
        {user?.email}
      </TableCell>
    </>
  );
};

export default User;
