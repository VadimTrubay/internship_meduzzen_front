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
import {fetchUsers} from "../../redux/users/operations";
import {selectTotalCount, selectUsers} from "../../redux/users/selectors";
import User from "../User/User";
import {selectLoading} from "../../redux/users/selectors";
import styles from "./UsersList.module.css";
import {AppDispatch} from "../../redux/store";
import {authType} from "../../types/authTypes";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50, align: "center"},
  {id: "name", label: "Name", minWidth: 120, align: "center"},
  {id: "email", label: "Email", minWidth: 120, align: "center"},
];

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const totalCount: number = useSelector(selectTotalCount);
  const loading = useSelector<boolean>(selectLoading);
  const [skip, setSkip] = useState<number>(1);
  const limit = 10;

  const countPage = Math.ceil(totalCount / limit);


  const handleChangePage = (event: React.ChangeEvent, newPage: React.SetStateAction<number>) => {
    setSkip(newPage)
  };

  useEffect(() => {
    dispatch(fetchUsers({skip, limit}));
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
                {users?.map((user: authType) => (
                  <TableRow key={user.id} className={styles.tableRow}>
                    <User user={user}/>
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

export default UsersList;
