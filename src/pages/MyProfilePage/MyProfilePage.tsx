import React from "react";
import Avatar from "@mui/material/Avatar";
import {Box, IconButton, SvgIcon} from "@mui/material";
import styles from "./MyProfilePage.module.css";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import {GrEdit} from "react-icons/gr";
import {MdDeleteForever} from "react-icons/md";
import {NavLink} from "react-router-dom";

const MyProfilePage: React.FC = () => {
  const selectedUser = useSelector(selectUser);

  return (
    <Box className={styles.box}>
      <div className={styles.title}>
        <h2>MY PROFILE</h2>
      </div>
      <div className={styles.avatar}>
        <Avatar alt="avatar" src={""} sx={{width: 80, height: 80}}/>
      </div>
      <p>Username: </p>
      <p>
        {selectedUser.username}
      </p>
      <p>Email: </p>
      <p>
        {selectedUser.email}
      </p>
      <p>
        <NavLink>
          <GrEdit/>
        </NavLink>
      </p>
      <p>
        <NavLink><
          MdDeleteForever/>
        </NavLink>
      </p>
    </Box>
  );
};

export default MyProfilePage;
