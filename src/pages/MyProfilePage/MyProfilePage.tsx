import React from "react";
import Avatar from "@mui/material/Avatar";
import {Box} from "@mui/material";
import styles from "./MyProfilePage.module.css";

const MyProfilePage: React.FC = () => {

  return (
    <Box className={styles.box}>
      <div className={styles.title}>
        <h2>My PROFILE</h2>
      </div>
      <div className={styles.avatar}>
        <Avatar alt="avatar" src={""} sx={{width: 80, height: 80}}/>
      </div>
      <p>Username: </p>
      <p>Email: </p>
    </Box>
  );
};

export default MyProfilePage;
