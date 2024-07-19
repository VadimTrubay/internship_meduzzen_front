import React, {useState} from "react";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {Box, Grid, Modal, TextField, Typography, FormControlLabel, Checkbox} from "@mui/material";
import {AppDispatch} from "../../redux/store";
import CompaniesList from "../../components/CompaniesList/CompaniesList";
import styles from "./ListOfCompaniesPage.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {useFormik} from "formik";
import {validationSchemaAddCompany} from "../../validate/validationSchemaAddCompany";
import {Toaster} from "react-hot-toast";
import {style, StyledBox, Text} from "./ListOfCompaniesPage.styled";
import {addCompany} from "../../redux/companies/operations";
import {initialValues} from "../../initialValues/initialValues";

const ListOfCompaniesPage: React.FC = () => {
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenAddCompanyModal = () => {
    setOpenAddCompanyModal(true);
    formikAddCompany.resetForm();
  }
  const handleCloseAddCompanyModal = () => {
    setOpenAddCompanyModal(false);
    formikAddCompany.resetForm();
  }

  const formikAddCompany = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaAddCompany,
    onSubmit: (values) => {
      if (formikAddCompany.isValid) {
        dispatch(addCompany(values))
      }
      handleCloseAddCompanyModal();
    },
  });

  const closeModal = () => {
    setOpenAddCompanyModal(false);
    formikAddCompany.resetForm();
  };

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Companies
          </Typography>
        </Grid>
      </Grid>
      <Box className={styles.addCompanyButton}>
        <Button
          variant="contained"
          onClick={handleOpenAddCompanyModal}
        >
          + Add Company
        </Button>
      </Box>
      <CompaniesList/>
      {/* Add company modal */}
      <Modal
        open={openAddCompanyModal}
        onClose={handleCloseAddCompanyModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={closeModal}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_add_company}>Add company</Text>
          </Typography>
          <StyledBox component="form" onSubmit={formikAddCompany.handleSubmit}>
            <Typography variant="h6">
              <Text>Name:</Text>
            </Typography>
            <TextField
              id="name"
              name="name"
              variant="standard"
              color="success"
              value={formikAddCompany.values.name}
              onChange={formikAddCompany.handleChange}
              onBlur={formikAddCompany.handleBlur}
              error={formikAddCompany.touched.name && Boolean(formikAddCompany.errors.name)}
              helperText={formikAddCompany.touched.name && formikAddCompany.errors.name}
            />
            <Typography variant="h6">
              <Text>Description:</Text>
            </Typography>
            <TextField
              id="description"
              name="description"
              variant="standard"
              color="success"
              value={formikAddCompany.values.description}
              onChange={formikAddCompany.handleChange}
              onBlur={formikAddCompany.handleBlur}
              error={formikAddCompany.touched.description && Boolean(formikAddCompany.errors.description)}
              helperText={formikAddCompany.touched.description && formikAddCompany.errors.description}
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
                  checked={formikAddCompany.values.visible}
                  onChange={formikAddCompany.handleChange}
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

export default ListOfCompaniesPage;
