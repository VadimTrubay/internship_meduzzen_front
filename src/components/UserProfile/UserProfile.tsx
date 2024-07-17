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
      <Box className={styles.container}>
        <Paper className={styles.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">USER PROFILE</Typography>
            </Grid>
            <Grid item xs={12} container direction="column" alignItems="center">
              <Avatar/>
              <Typography variant="body1" gutterBottom color="textSecondary">
                Username: {user?.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {user?.email}
                <Typography variant="body2" color="textSecondary">
                  Role: {user?.is_admin ? "admin" : "user"}
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default UserProfile;
