import React from "react";
import {
  Avatar,
  Box,
  Grid,
  LinearProgress,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import styles from "./CompanyAdminsPage.module.css";
import {memberType} from "../../types/actionsTypes";
import {selectAdmins, selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";


const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "username", label: "Name", minWidth: 120},
  {id: "role", label: "Role", minWidth: 80},
];


const CompanyAdminsPage: React.FC = () => {
  const admins = useSelector(selectAdmins) as memberType[];
  const company = useSelector(selectCompanyById) as CompanyType;
  const loading = useSelector<boolean>(selectLoading);

  return (
    loading ? (
      <Box>
        <LinearProgress/>
      </Box>
    ) : (
      <>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Company Admins
            </Typography>
            <Typography variant="h6">"{company?.name}"</Typography>
          </Grid>
        </Grid>
        <Paper>
          <TableContainer className={styles.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      sx={{backgroundColor: "#a4a4a4"}}
                      key={column.id}
                      align={"center"}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={styles.tableHead}>
                {admins.map((admin: memberType) => (
                  <TableRow key={admin?.id} className={styles.tableRow}>
                    <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                      <Avatar className={styles.avatar}/>
                    </TableCell>
                    <TableCell align="center">{admin?.user_username}</TableCell>
                    <TableCell align="center">admin</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </>
    )
  );
};

export default CompanyAdminsPage;
