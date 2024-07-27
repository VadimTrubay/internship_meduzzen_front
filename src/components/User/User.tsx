import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {fetchUserById} from "../../redux/users/operations";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "./User.module.css";
import {mainUrls} from "../../config/urls";
import {UserProps} from "../../types/usersTypes";


const User: React.FC<UserProps> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGetUser = (id: string) => {
    dispatch(fetchUserById(id));
    navigate(mainUrls.users.byId(id));
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
        <Avatar className={styles.avatar}/>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        <span className={styles.link} onClick={() => handleGetUser(user?.id)}>
          {user?.username}
        </span>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        {user?.email}
      </TableCell>
    </>
  );
};

export default User;
