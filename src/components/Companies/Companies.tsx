import React from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import TableCell from "@mui/material/TableCell";
import Avatar from "@mui/material/Avatar";
import {useNavigate} from "react-router-dom";
import {fetchCompanyById} from "../../redux/companies/operations";
import {CompanyProps} from "../../types/companiesTypes";
import styles from "./Companies.module.css";


const Companies: React.FC<CompanyProps> = ({company}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGetCompany = (id: string) => {
    dispatch(fetchCompanyById(id));
    navigate(`/company/${id}`);
  };

  return (
    <>
      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
        <Avatar className={styles.avatar}/>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        <span className={styles.link} onClick={() => handleGetCompany(company.id)}>
          {company?.name}
        </span>
      </TableCell>
      <TableCell sx={{padding: "3px"}} align="center">
        {company?.description}
      </TableCell>
    </>
  );
};

export default Companies;
