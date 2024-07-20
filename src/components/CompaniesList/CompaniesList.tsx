import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Box, LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {fetchCompanies, fetchCompanyById} from "../../redux/companies/operations";
import {selectTotalCount, selectCompanies} from "../../redux/companies/selectors";
import {selectLoading} from "../../redux/companies/selectors";
import {AppDispatch} from "../../redux/store";
import {CompanyType} from "../../types/companiesTypes";
import Avatar from "@mui/material/Avatar";
import {NavLink} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {selectUser} from "../../redux/auth/selectors";
import styles from "./CompaniesList.module.css";

const columns = [
  {id: "avatar", label: "avatar", minWidth: 50, align: "center"},
  {id: "name", label: "Name", minWidth: 120, align: "center"},
  {id: "description", label: "Description", minWidth: 120, align: "center"},
  {id: "visible", label: "Visible", minWidth: 50, align: "center"},
];

const CompaniesList = () => {
  const user = useSelector(selectUser);
  const totalCount: number = useSelector(selectTotalCount);
  const loading = useSelector<boolean>(selectLoading);
  const [skip, setSkip] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const {companies} = useSelector(selectCompanies);
  const limit = 10;

  const countPage = Math.ceil(totalCount / limit);

  const handleChangePage = (event: React.ChangeEvent, newPage: React.SetStateAction<number>) => {
    setSkip(newPage)
  };

  const handleGetCompany = (id: string) => {
    dispatch(fetchCompanyById(id));
  };

  useEffect(() => {
    dispatch(fetchCompanies({skip, limit}));
  }, [dispatch, skip]);

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        <Paper>
          <TableContainer className={styles.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell sx={{backgroundColor: "#a4a4a4"}}
                               key={column.id}
                               align={column.align}
                               style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableHead}>

                {companies?.filter((company: CompanyType) => company.owner_id === user.id || company.visible)
                  .map(({
                          id,
                          name,
                          description,
                          visible,
                        }: CompanyType) => (
                    <TableRow key={id} className={styles.tableRow}>
                      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                        <Avatar className={styles.avatar}/>
                      </TableCell>
                      <TableCell align="center">
                        <NavLink className={styles.link} to={id} onClick={() => handleGetCompany(id)}>
                          {name}
                        </NavLink>
                      </TableCell>
                      <TableCell sx={{padding: "3px"}} align="center">
                        {description}
                      </TableCell>
                      <TableCell sx={{padding: "3px"}} align="center">
                        {visible ? <FaEye/> : <FaEyeSlash/>}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{display: "flex", justifyContent: "center", marginTop: 4}}>
            <Pagination
              count={countPage}
              page={skip}
              onChange={handleChangePage}
              color={"primary"}/>
          </Box>
        </Paper>
      )
  );
};

export default CompaniesList;
