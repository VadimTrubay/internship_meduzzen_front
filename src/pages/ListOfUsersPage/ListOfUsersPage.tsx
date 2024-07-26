import React from "react";
import styles from "./ListOfUsersPage.module.css";
import UsersList from "../../components/UsersList/UsersList";
import {Grid, Typography} from "@mui/material";

const ListOfUsersPage: React.FC = () => {
  return (
    <div className={styles.title}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
      </Grid>
      <UsersList/>
    </div>
  );
};

export default ListOfUsersPage;
