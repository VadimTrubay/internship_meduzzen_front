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
import {fetchCompanies} from "../../redux/companies/operations";
import {selectTotalCount, selectCompanies} from "../../redux/companies/selectors";
import Companies from "../Companies/Companies";
import {selectLoading} from "../../redux/companies/selectors";
import {AppDispatch} from "../../redux/store";
import {CompanyType} from "../../types/companiesTypes";
import styles from "./CompaniesList.module.css";

const columns = [
  {id: "avatar", label: "avatar", minWidth: 50, align: "center"},
  {id: "name", label: "Name", minWidth: 120, align: "center"},
  {id: "description", label: "Description", minWidth: 120, align: "center"},
];

const CompaniesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {companies} = useSelector(selectCompanies);
  const totalCount: number = useSelector(selectTotalCount);
  const loading = useSelector<boolean>(selectLoading);
  const [skip, setSkip] = useState<number>(1);
  const limit = 10;

  const countPage = Math.ceil(totalCount / limit);

  const handleChangePage = (event: React.ChangeEvent, newPage: React.SetStateAction<number>) => {
    setSkip(newPage)
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
                {companies?.map((company: CompanyType) => (
                  <TableRow key={company.id} className={styles.tableRow}>
                    <Companies company={company}/>
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
