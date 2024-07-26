import React, {useEffect, useState} from "react";
import {Box, Button, Checkbox, FormControlLabel, Grid, Modal, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyById} from "../../redux/companies/selectors";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import styles from "../UserProfilePage/UserProfilePage.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {Toaster} from "react-hot-toast";
import {deleteCompanyById, fetchCompanyById, updateCompany} from "../../redux/companies/operations";
import {useFormik} from "formik";
import {validationSchemaUpdateCompany} from "../../validate/validationSchemaUpdateCompany";
import {AppDispatch} from "../../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {NavLink, useNavigate} from "react-router-dom";
import {initialValueUpdateCompany} from "../../initialValues/initialValues";
import {selectUser} from "../../redux/auth/selectors";
import {companies, mainUrls, members} from "../../config/urls";
import {fetchMembers} from "../../redux/actions/operations";


const CompanyProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditCompanyModal, setOpenEditCompanyModal] = useState<boolean>(false);
  const company = useSelector(selectCompanyById);

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
        dispatch(fetchCompanyById(company?.id));
      }
      handleCloseEditCompanyModal();
      navigate(mainUrls.companies.byId(company?.id));
    },
  });

  const handleDeleteCompany = () => {
    dispatch(deleteCompanyById(company?.id));
    handleCloseDeleteModal();
    navigate(companies);
  };

  const handleOpenCompaniesMembers = () => {
    dispatch(fetchMembers(company?.id))
  };

  const closeModal = () => {
    setOpenEditCompanyModal(false);
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Company Profile
          </Typography>
        </Grid>
        {currentUser?.id === company?.owner_id &&
          <Box>
            <NavLink className={styles.link} to={members}
                     onClick={() => handleOpenCompaniesMembers()}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{margin: 1}}
              >
                Company Members
              </Button>
            </NavLink>
          </Box>
        }
        <Grid item xs={12}>
          <Avatar/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Name:
          </Typography>
          <Typography color="textSecondary">
            {company ? company?.name : null}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Description:
          </Typography>
          <Typography color="textSecondary">
            {company ? company?.description : null}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Visible:
          </Typography>
          <Typography color="textSecondary">
            {company ? company?.visible ? <FaEye/> : <FaEyeSlash/> : null}
          </Typography>
        </Grid>
        {currentUser?.id === company?.owner_id &&
          <Box marginTop={2}>
            <Button
              onClick={handleOpenEditCompanyModal}
              variant="outlined"
              startIcon={<EditIcon/>}
              color="primary"
              sx={{marginRight: 1}}
            >
              Edit Company
            </Button>
            <Button
              onClick={handleOpenDeleteModal}
              variant="outlined"
              startIcon={<DeleteIcon/>}
              color="error"
            >
              Delete Company
            </Button>
          </Box>}
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
            <Text>&apos;{company?.name}&apos;</Text>
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
