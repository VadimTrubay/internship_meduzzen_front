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
import toast, {Toaster} from "react-hot-toast";
import {AppDispatch} from "../../redux/store";
import {deleteUserById, updatePassword, updateUsername} from "../../redux/users/operations";
import styles from "./MyProfilePage.module.css";
import {getMe, logOut} from "../../redux/auth/operations";
import {useFormik} from "formik";
import {PasswordUpdateBackType, PasswordUpdateType, UsernameUpdateType} from "../../types/authTypes";
import {validationSchemaUpdateUsername} from "../../validate/validationSchemaUpdateUsername.js";
import {useAuth0} from "@auth0/auth0-react";
import {validationSchemaUpdatePassword} from "../../validate/validationSchemaUpdatePassword";

const MyProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const userAuth0 = useAuth0();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(false);
  const [updatedUsername, setUpdatedUsername] = useState<string>(user?.username);
  const [openEditPasswordModal, setOpenEditPasswordModal] = useState<boolean>(false);


  const handleOpenEditUsernameModal = () => setOpenEditUsernameModal(true);
  const handleCloseEditUsernameModal = () => setOpenEditUsernameModal(false);
  const handleOpenEditPasswordModal = () => setOpenEditPasswordModal(true);
  const handleCloseEditPasswordModal = () => {
    formikEditPassword.resetForm();
    setOpenEditPasswordModal(false);
  };
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const initialValueUpdateUsername: UsernameUpdateType = {
    id: user.id,
    username: user.username,
  };

  const initialValueUpdatePassword: PasswordUpdateType = {
    id: user.id,
    password: "",
    new_password: "",
    confirmPassword: "",
  };

  const formikEditUsername = useFormik({
    initialValues: initialValueUpdateUsername,
    validationSchema: validationSchemaUpdateUsername,
    onSubmit: (values) => {
      if (formikEditUsername.isValid) {
        dispatch(updateUsername(values))
      }
      handleCloseEditUsernameModal();
      dispatch(getMe())
    },
  });

  const formikEditPassword = useFormik({
    initialValues: initialValueUpdatePassword,
    validationSchema: validationSchemaUpdatePassword,
    onSubmit: (values) => {
      if (formikEditUsername.isValid) {
        dispatch(updatePassword<PasswordUpdateBackType>(values))
        dispatch(getMe())
      }
      handleCloseEditPasswordModal();
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
    setOpenEditPasswordModal(false);
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
          <Avatar src={userAuth0?.user?.picture}/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Username:
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {userAuth0?.user?.name || updatedUsername}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Email:
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {userAuth0?.user?.email || user?.email}
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
            onClick={handleOpenEditPasswordModal}
            variant="outlined"
            startIcon={<EditIcon/>}
            color="primary"
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

      {/*Delete modal*/}
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

      {/*Edit username modal*/}
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
          <StyledBox component="form" onSubmit={formikEditUsername.handleSubmit}>
            <TextField
              id="username"
              name="username"
              variant="standard"
              color="success"
              value={formikEditUsername.values.username}
              onChange={formikEditUsername.handleChange}
              onBlur={formikEditUsername.handleBlur}
              error={formikEditUsername.touched.username && Boolean(formikEditUsername.errors.username)}
              helperText={formikEditUsername.touched.username && formikEditUsername.errors.username}
            />
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "inherit"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      {/*Edit password modal*/}
      <Modal
        open={openEditPasswordModal}
        onClose={handleCloseEditPasswordModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeModal}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_edit}>Edit password</Text>
          </Typography>
          <Typography variant="h6">
            <Text>password:</Text>
          </Typography>
          <StyledBox component="form" onSubmit={formikEditPassword.handleSubmit}>
            <TextField
              id="password"
              name="password"
              variant="standard"
              color="success"
              value={formikEditPassword.values.password}
              onChange={formikEditPassword.handleChange}
              onBlur={formikEditPassword.handleBlur}
              error={formikEditPassword.touched.password && Boolean(formikEditPassword.errors.password)}
              helperText={formikEditPassword.touched.password && formikEditPassword.errors.password}
            />
            <Typography variant="h6">
              <Text>new password:</Text>
            </Typography>
            <TextField
              id="new_password"
              name="new_password"
              variant="standard"
              color="success"
              value={formikEditPassword.values.new_password}
              onChange={formikEditPassword.handleChange}
              onBlur={formikEditPassword.handleBlur}
              error={formikEditPassword.touched.new_password && Boolean(formikEditPassword.errors.new_password)}
              helperText={formikEditPassword.touched.new_password && formikEditPassword.errors.new_password}
            />
            <Typography variant="h6">
              <Text>confirm password:</Text>
            </Typography>
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              variant="standard"
              color="success"
              value={formikEditPassword.values.confirmPassword}
              onChange={formikEditPassword.handleChange}
              onBlur={formikEditPassword.handleBlur}
              error={formikEditPassword.touched.confirmPassword && Boolean(formikEditPassword.errors.confirmPassword)}
              helperText={formikEditPassword.touched.confirmPassword && formikEditPassword.errors.confirmPassword}
            />
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "inherit"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      <Toaster position="top-center"/>
    </>
  )
    ;
};

export default MyProfilePage;
