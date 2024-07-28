import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import {Box, Grid, Modal, TextField, Typography, FormControlLabel, Checkbox} from "@mui/material";
import {AppDispatch} from "../../redux/store";
import CompaniesList from "../../components/CompaniesList/CompaniesList";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {useFormik} from "formik";
import {validationSchemaAddCompany} from "../../validate/validationSchemaAddCompany";
import toast from "react-hot-toast";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import {addCompany} from "../../redux/companies/operations";
import {initialValues} from "../../initialValues/initialValues";
import styles from "./ListOfCompaniesPage.module.css";
import {selectUser} from "../../redux/auth/selectors";
import {selectCompanies, selectError} from "../../redux/companies/selectors";
import {CompaniesListProps} from "../../types/companiesTypes";
import {UserType} from "../../types/usersTypes";

const ListOfCompaniesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [openAddCompanyModal, setOpenAddCompanyModal] = useState<boolean>(false);
  const user = useSelector(selectUser) as UserType;
  const {companies} = useSelector(selectCompanies) as CompaniesListProps[];
  const error = useSelector<string>(selectError);
  const [showOption, setShowOption] = useState<number>(0);

  const handleOpenAddCompanyModal = () => {
    setOpenAddCompanyModal(true);
    formikAddCompany.resetForm();
  };

  const handleCloseAddCompanyModal = () => {
    setOpenAddCompanyModal(false);
    formikAddCompany.resetForm();
  };

  const formikAddCompany = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaAddCompany,
    onSubmit: (values) => {
      if (error) {
        toast.error(`Error adding`);
      } else if (formikAddCompany.isValid) {
        dispatch(addCompany(values));
        toast.success(`Company added successfully`);
      }
      handleCloseAddCompanyModal();
    },
  });

  const closeModal = () => {
    setOpenAddCompanyModal(false);
    formikAddCompany.resetForm();
  };

  const handleCheckboxChange = (option: number) => {
    setShowOption(option);
  };

  const filteredCompanies = (() => {
    switch (showOption) {
      case 0:
        return companies;
      case 1:
        return companies.filter(company => company.owner_id === user.id);
      case 2:
        return companies.filter(company => company.owner_id !== user.id);
      default:
        return companies;
    }
  })();

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Companies
          </Typography>
        </Grid>
      </Grid>
      <Box className={styles.addCompanyButton}>
        <Button variant="contained" onClick={handleOpenAddCompanyModal}>
          + Add Company
        </Button>
      </Box>
      <Box className={styles.filterCompanies}>
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
      <CompaniesList companies={filteredCompanies}/>

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
    </>
  );
};

export default ListOfCompaniesPage;
