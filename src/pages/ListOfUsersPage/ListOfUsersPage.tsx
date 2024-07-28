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
  const [showOption, setShowOption] = useState<number>(1);

  const handleCheckboxChange = (option: number) => {
    setShowOption(option);
  };

  const filteredUsers = (() => {
    switch (showOption) {
      case 0:
        return users;
      case 1:
        return users.filter(user => user.id === currentUser.id);
      case 2:
        return users.filter(user => user.id !== currentUser.id);
      default:
        return users;
    }
  })();

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Users
          </Typography>
        </Grid>
      </Grid>
      <Box className={styles.filterUsers}>
        <FormControlLabel
          control={
            <Checkbox
              checked={showOption === 0}
              onChange={() => handleCheckboxChange(0)}
            />
          }
          label="All"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showOption === 1}
              onChange={() => handleCheckboxChange(1)}
            />
          }
          label="Me"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showOption === 2}
              onChange={() => handleCheckboxChange(2)}
            />
          }
          label="Others"
        />
      </Box>
      <UsersList users={filteredUsers}/>
    </>
  );
};

export default ListOfUsersPage;
