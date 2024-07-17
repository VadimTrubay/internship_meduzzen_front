import React from "react";
import {useSelector} from "react-redux";
import Avatar from "@mui/material/Avatar";
import {Box, Grid, Paper, Typography} from "@mui/material";
import styles from "./UserProfile.module.css";
import {selectUserById} from "../../redux/users/selectors";

const UserProfile: React.FC = () => {
  const user = useSelector(selectUserById);

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            USER PROFILE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Username:
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user?.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Email:
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user?.email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Role:
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {user?.is_admin ? "admin" : "user"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
