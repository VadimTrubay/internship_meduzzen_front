import React from "react";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import {Box} from "@mui/material";
import {AppDispatch} from "../../redux/store";
import CompaniesList from "../../components/CompaniesList/CompaniesList";
import styles from "./ListOfCompaniesPage.module.css";

const ListOfCompaniesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddCompany = () => {
    // dispatch(handleAddCompany())
  }
  return (
    <div className={styles.title}>
      <h2>COMPANIES</h2>
      <Box className={styles.addCompanyButton}>
        <Button
          variant="contained"
          onClick={handleAddCompany}
        >
          + Add Company
        </Button>
      </Box>
      <CompaniesList/>
    </div>
  );
};

export default ListOfCompaniesPage;
