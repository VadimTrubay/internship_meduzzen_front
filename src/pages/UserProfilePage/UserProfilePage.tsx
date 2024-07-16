import React from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import Avatar from "@mui/material/Avatar";
import {Box} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import styles from "./UserProfilePage.module.css";

const UserProfilePage: React.FC = () => {
  const {user} = useAuth0();
  const userBase = useSelector(selectUser);

  return (
    <Box className={styles.box}>
      <div className={styles.title}>
        <h2>USER PROFILE PAGE</h2>
      </div>
      <div className={styles.avatar}>
        <Avatar alt="avatar" src={user?.picture} sx={{width: 80, height: 80}}/>
      </div>
      <p>User ID: {user ? user.id : userBase?.id}</p>
      <p>Username: {user ? user.name : userBase?.username}</p>
      <p>Email: {user ? user.email : userBase?.email}</p>
    </Box>
  );
};

export default UserProfilePage;
