import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import { fetchUsers } from "../../redux/users/operations";
import {selectTotalCount, selectUsers} from "../../redux/users/selectors";
import User from "../User/User";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const selectedTotalCount = useSelector(selectTotalCount);
  const [skip, setSkip] = useState(1);
  const limit = 10;

  const countPage = Math.round(selectedTotalCount / limit);

  const handleChangePage = (event, newPage) => {
    setSkip(newPage)
  };


  useEffect(() => {
    dispatch(fetchUsers({ skip, limit }));
  }, [dispatch, skip, limit]);

  const columns = [
    { id: "avatar", label: "Avatar", minWidth: 50, align: "center" },
    { id: "name", label: "Name", minWidth: 120, align: "center" },
    { id: "email", label: "Email", minWidth: 120, align: "center" },
  ];

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <User user={user}/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Pagination count={countPage} onChange={handleChangePage} color="primary" />
    </Paper>
  );
};

export default UsersList;
