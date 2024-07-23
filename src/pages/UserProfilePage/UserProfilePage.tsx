import React, {useState, useEffect} from "react";
import styles from "./UserProfilePage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import Avatar from "@mui/material/Avatar";
import {Grid, Typography, Button, Box, Modal, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Toaster} from "react-hot-toast";
import {AppDispatch} from "../../redux/store";
import {deleteUser, updatePassword, updateUsername} from "../../redux/users/operations";
import {getMe, logOut} from "../../redux/auth/operations";
import {validationSchemaUpdateUsername} from "../../validate/validationSchemaUpdateUsername.js";
import {validationSchemaUpdatePassword} from "../../validate/validationSchemaUpdatePassword";
import {initialValueUpdatePassword, initialValueUpdateUsername} from "../../initialValues/initialValues";
import {style, StyledBox, Text} from "./UserProfilePage.styled";
import {selectUserById} from "../../redux/users/selectors";
import {selectUser} from "../../redux/auth/selectors";
import {setAccessToken} from "../../redux/auth/slice";
import {useAuth0} from "@auth0/auth0-react";

const UserProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const user = useSelector(selectUserById);
  const { isAuthenticated } = useAuth0()
  const { logout } = useAuth0()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditUsernameModal, setOpenEditUsernameModal] = useState<boolean>(false);
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

  useEffect(() => {
    if (user) {
      formikEditUsername.setValues(user);
    }
  }, [user])

  const formikEditUsername = useFormik({
    initialValues: initialValueUpdateUsername,
    validationSchema: validationSchemaUpdateUsername,
    onSubmit: (values) => {
      if (formikEditUsername.isValid) {
        dispatch(updateUsername(values))
        dispatch(getMe())
      }
      handleCloseEditUsernameModal();
    },
  });

  const formikEditPassword = useFormik({
    initialValues: initialValueUpdatePassword,
    validationSchema: validationSchemaUpdatePassword,
    onSubmit: (values) => {
      if (formikEditPassword.isValid) {
        dispatch(updatePassword({id: user.id, password: values.password, new_password: values.new_password}))
        dispatch(getMe())
      }
      handleCloseEditPasswordModal();
    },
  });

  const handleDeleteContact = () => {
    dispatch(deleteUser(user.id));
    dispatch(logOut());
    handleCloseDeleteModal();
  };

  const closeModal = () => {
    setOpenEditUsernameModal(false);
    setOpenEditPasswordModal(false);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            USER PROFILE PAGE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Username:
          </Typography>
          <Typography color="textSecondary">
            {user?.username}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Email:
          </Typography>
          <Typography color="textSecondary">
            {user?.email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Role:
          </Typography>
          <Typography color="textSecondary">
            {user?.is_admin ? "admin" : "user"}
          </Typography>
        </Grid>
        {user?.id === currentUser?.id &&
          <Box marginRight={2}>
            <Button
              onClick={handleOpenEditUsernameModal}
              variant="outlined"
              startIcon={<EditIcon/>}
              color="primary"
              sx={{marginRight: 1}}
            >
              Change Username
            </Button>
            <Button
              onClick={handleOpenEditPasswordModal}
              variant="outlined"
              startIcon={<EditIcon/>}
              color="primary"
              sx={{marginRight: 1}}
            >
              Change Password
            </Button>
            <Button
              onClick={handleOpenDeleteModal}
              variant="outlined"
              startIcon={<DeleteIcon/>}
              color="error"
              sx={{marginRight: 1}}
            >
              Delete Profile
            </Button>
          </Box>}
      </Grid>

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
            <Text>&apos;{user?.username}&apos;</Text>
          </Typography>
          <StyledBox component="form" onSubmit={handleDeleteContact}>
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "red"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      <Toaster position="top-center"/>
    </>
  );
};

export default UserProfilePage;
