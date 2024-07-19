import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import {NavLink} from "react-router-dom";
import {fetchCompanyById} from "../../redux/companies/operations";
import {CompanyProps} from "../../types/companiesTypes";
import styles from "./Companies.module.css";


const Companies: React.FC<CompanyProps> = ({company}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleGetCompany = () => {
    dispatch(fetchCompanyById(company.id));
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
        <Avatar className={styles.avatar}/>
      </TableCell>
      <TableCell  align="center">
        <NavLink className={styles.link} to={company.id} onClick={() => handleGetCompany()}>
          {company?.name}
        </NavLink>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        {company?.description}
      </TableCell>
    </>
  );
};

export default Companies;
