import React, {useEffect, useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, Grid, Modal, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyById} from "../../redux/companies/selectors";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {style, StyledBox, Text} from "../MyProfilePage/MyProfile.styled";
import styles from "../MyProfilePage/MyProfilePage.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {Toaster} from "react-hot-toast";
import {deleteCompanyById, updateCompany} from "../../redux/companies/operations";
import {useFormik} from "formik";
import {validationSchemaUpdateCompany} from "../../validate/validationSchemaUpdateCompany";
import {AppDispatch} from "../../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from "react-router-dom";
import {initialValueUpdateCompany} from "../../initialValues/initialValues";


const CompanyProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(selectCompanyById);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditCompanyModal, setOpenEditCompanyModal] = useState<boolean>(false);

  const handleOpenEditCompanyModal = () => setOpenEditCompanyModal(true);
  const handleCloseEditCompanyModal = () => {
    formikEditCompany.resetForm();
    setOpenEditCompanyModal(false);
  };
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  useEffect(() => {
    if (company) {
      formikEditCompany.setValues(company);
    }
  }, [company])

  const formikEditCompany = useFormik({
    initialValues: initialValueUpdateCompany,
    validationSchema: validationSchemaUpdateCompany,
    onSubmit: (values) => {
      if (formikEditCompany.isValid) {
        dispatch(updateCompany(values))
      }
      handleCloseEditCompanyModal();
      navigate(`/companies`);
    },
  });

  const handleDeleteCompany = () => {
    dispatch(deleteCompanyById(company.id));
    handleCloseDeleteModal();
    navigate(`/companies`);
  };

  const closeModal = () => {
    setOpenEditCompanyModal(false);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            COMPANY PROFILE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Name:
          </Typography>
          <Typography color="textSecondary">
            {company?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Description:
          </Typography>
          <Typography color="textSecondary">
            {company?.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Visible:
          </Typography>
          <Typography color="textSecondary">
            {company.visible ? <FaEye/> : <FaEyeSlash/>}
          </Typography>
        </Grid>
        <Box marginTop={2}>
          <Button
            onClick={handleOpenEditCompanyModal}
            variant="outlined"
            startIcon={<EditIcon/>}
            color="primary"
          >
            Edit Company
          </Button>
        </Box>
        <Box marginTop={2}>
          <Button
            onClick={handleOpenDeleteModal}
            variant="outlined"
            startIcon={<DeleteIcon/>}
            color="error"
          >
            Delete Company
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
            <Text className={styles.title_delete}>Delete company</Text>
            <Text>Are you sure you want to delete this company?</Text>
            <Text>&apos;{company.name}&apos;</Text>
          </Typography>
          <StyledBox component="form" onSubmit={handleDeleteCompany}>
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "red"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      {/*Edit modal*/}
      <Modal
        open={openEditCompanyModal}
        onClose={handleCloseEditCompanyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeModal}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_add_company}>Edit company</Text>
          </Typography>
          <StyledBox component="form" onSubmit={formikEditCompany.handleSubmit}>
            <Typography variant="h6">
              <Text>Name:</Text>
            </Typography>
            <TextField
              id="name"
              name="name"
              variant="standard"
              color="success"
              value={formikEditCompany.values.name}
              onChange={formikEditCompany.handleChange}
              onBlur={formikEditCompany.handleBlur}
              error={formikEditCompany.touched.name && Boolean(formikEditCompany.errors.name)}
              helperText={formikEditCompany.touched.name && formikEditCompany.errors.name}
            />
            <Typography variant="h6">
              <Text>Description:</Text>
            </Typography>
            <TextField
              id="description"
              name="description"
              variant="standard"
              color="success"
              value={formikEditCompany.values.description}
              onChange={formikEditCompany.handleChange}
              onBlur={formikEditCompany.handleBlur}
              error={formikEditCompany.touched.description && Boolean(formikEditCompany.errors.description)}
              helperText={formikEditCompany.touched.description && formikEditCompany.errors.description}
            />
            <Typography variant="h6">
              <Text>Visible:</Text>
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  id="visible"
                  name="visible"
                  color="success"
                  checked={formikEditCompany.values.visible}
                  onChange={formikEditCompany.handleChange}
                />
              }
              label="Visible"
            />
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "inherit"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      <Toaster position="top-center"/>
    </>
  );
};

export default CompanyProfilePage;
