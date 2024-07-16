import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import {Grid, Typography, Button, Box, Modal, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {style, StyledBox, Text} from "./MyProfile.styled";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import {AppDispatch} from "../../redux/store";
import {deleteUserById, updateUsername} from "../../redux/users/operations";
import styles from "./MyProfilePage.module.css";
import {logOut} from "../../redux/auth/operations";
import {useFormik} from "formik";
import {UsernameUpdateType} from "../../types/usersTypes";
import {validationSchemaUpdateUsername} from "../../validate/validationSchemaUpdateUsername.js";

const MyProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(false);
  const [updatedUsername, setUpdatedUsername] = useState<string>(user?.username);

  const handleOpenEditUsernameModal = () => setOpenEditUsernameModal(true);
  const handleCloseEditUsernameModal = () => setOpenEditUsernameModal(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const initialValueUpdateUsername: UsernameUpdateType = {
    userId: user.id,
    username: user.username,
  };

  const formik = useFormik({
    initialValues: initialValueUpdateUsername,
    validationSchema: validationSchemaUpdateUsername,
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(updateUsername(values)).then(() => {
          setUpdatedUsername(values.username);
          toast.success(`Username updated successfully`);
          handleCloseEditUsernameModal();
        });
      }
    },
  });

  const handleDeleteContact = () => {
    dispatch(deleteUserById(user.id));
    dispatch(logOut());
    toast.error(`User ${user.username} deleted successfully`);
    handleCloseDeleteModal();
  };

  const closeModal = () => {
    setOpenEditUsernameModal(false);
    setOpenDeleteModal(false);
  };

  useEffect(() => {
    setUpdatedUsername(user?.username);
  }, [user]);

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            MY PROFILE
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
            {updatedUsername}
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
            {user.is_admin ? "admin" : "user"}
          </Typography>
        </Grid>
        <Box marginTop={2}>
          <Button
            onClick={handleOpenEditUsernameModal}
            variant="outlined"
            startIcon={<EditIcon/>}
            color="primary"
          >
            Change Username
          </Button>
        </Box>
        <Box marginTop={2}>
          <Button
            onClick={""}
            variant="outlined"
            startIcon={<EditIcon/>}
            color="success"
          >
            Change Password
          </Button>
        </Box>
        <Box marginTop={2}>
          <Button
            onClick={handleOpenDeleteModal}
            variant="outlined"
            startIcon={<DeleteIcon/>}
            color="error"
          >
            Delete Profile
          </Button>
        </Box>
      </Grid>

      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeModal} color={"error"}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_delete}>Delete profile</Text>
            <Text>Are you sure you want to delete this profile?</Text>
            <Text>&apos;{user.username}&apos;</Text>
          </Typography>
          <StyledBox component="form" onSubmit={handleDeleteContact}>
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "red"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      <Modal
        open={openEditUsernameModal}
        onClose={handleCloseEditUsernameModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeModal}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_edit}>Edit username</Text>
          </Typography>
          <StyledBox component="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="username"
              name="username"
              variant="standard"
              color="success"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "inherit"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>
    </>
  );
};

export default MyProfilePage;
