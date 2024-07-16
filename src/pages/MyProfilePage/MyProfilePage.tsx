import React, {useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Grid, Typography, Paper, TextField, Button, Box} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import {GrEdit} from "react-icons/gr";
import {NavLink} from "react-router-dom";
import styles from "./MyProfilePage.module.css";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     padding: theme.spacing(4),
//     margin: "auto",
//     width: 500,
//   },
//   img: {
//     margin: "auto",
//     display: "block",
//     width: "100%",
//     height: "100%",
//   },
//   avatar: {
//     width: 150,
//     height: 150,
//   },
//   textField: {
//     marginBottom: theme.spacing(2),
//   },
// }));


const MyProfilePage = () => {
  const user = useSelector(selectUser);

  return (
    <Box className={styles.container}>
      <Paper className={styles.paper}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} alignItems="center">
            <Typography variant="h4">MY PROFILE</Typography>
              <Button variant="outlined" startIcon={<DeleteIcon/>}>
                Delete Profile
              </Button>
          </Grid>
          <Grid item xs={12} container direction="column" alignItems="center">
            <Avatar/>
            <Typography variant="body1" gutterBottom color="textSecondary">
              Username: {user?.username}
              <NavLink to="/edit-profile">
                <GrEdit/>
              </NavLink>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {user?.email}
              <Typography variant="body2" color="textSecondary">
                Role: {user.is_admin ? "admin" : "user"}
              </Typography>
            </Typography>
            <PasswordMgmt/>

          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

const PasswordMgmt = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submittable, setSubmittable] = useState(true);

  const validateNewPassword = () => {
    const isValid = currPassword === sampleAccount.password && newPassword === confirmNewPassword;
    setSubmittable(isValid);
  };

  return (
    <Paper className={styles.paper}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h4">Password Management</Typography>
        </Grid>
        <Grid item>
          <TextField
            label="Current Password"
            variant="outlined"
            type="password"
            className={styles.textField}
            onChange={(e) => setCurrPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            // fullWidth
            className={styles.textField}
            disabled={!currPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Confirm New Password"
            variant="outlined"
            type="password"
            // fullWidth
            className={styles.textField}
            disabled={!currPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            onBlur={validateNewPassword}
          />
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button disabled={!submittable} variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};


export default MyProfilePage;
