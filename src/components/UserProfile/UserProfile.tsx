import React from "react";
import {useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {Box} from "@mui/material";
import styles from "./UserProfile.module.css";
import {selectUserById} from "../../redux/users/selectors";

const UserProfile: React.FC = () => {
  const user = useSelector(selectUserById);

  return (
    <Box className={styles.box}>
      <div className={styles.title}>
        <h2>USER PROFILE</h2>
      </div>
      <div className={styles.avatar}>
        <Avatar alt="avatar" src={user?.picture} sx={{width: 80, height: 80}}/>
      </div>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
    </Box>
  );
};

export default UserProfile;
