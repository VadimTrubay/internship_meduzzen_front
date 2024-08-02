import React from "react";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import {NavLink, useNavigate} from "react-router-dom";
import {fetchUserById} from "../../redux/users/operations";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import styles from "./User.module.css";
import {mainUrls} from "../../config/urls";
import {UserProps} from "../../types/usersTypes";


const User: React.FC<UserProps> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGetUser = (userid: string) => {
    if (userid) {
      dispatch(fetchUserById(userid));
      navigate(mainUrls.users.byId(userid));
    }
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
        <Avatar className={styles.avatar}/>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        <NavLink className={styles.link} to={mainUrls.users.byId(user?.id)}
                 onClick={() => handleGetUser(user?.id)}>
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
