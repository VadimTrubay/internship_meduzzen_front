import React, {useState} from "react";
import styles from "./ListOfUsersPage.module.css";
import UsersList from "../../components/UsersList/UsersList";
import {Box, Checkbox, FormControlLabel, Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUsers} from "../../redux/users/selectors";
import {UserType} from "../../types/usersTypes";
import {selectUser} from "../../redux/auth/selectors";

const ListOfUsersPage: React.FC = () => {
  const currentUser = useSelector(selectUser) as UserType;
  const users = useSelector(selectUsers) as UserType[];
  const [showMe, setShowMe] = useState<boolean>(false);


  const filteredUsers = showMe
    ? users.filter(user => user.id === currentUser.id)
    : users;

  return (
    <div className={styles.title}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
      </Grid>
      <Box className={styles.filterUsers}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showMe}
              onChange={() => setShowMe(!showMe)}
            />
          }
          label="Show Only My"
        />
      </Box>
      <UsersList users={filteredUsers}/>
    </div>
  );
};

export default ListOfUsersPage;
