import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Box, Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import styles from "./UserTestsList.module.css";
import {selectLoading} from "../../redux/users/selectors";
import {selectMyQuizzesResults} from "../../redux/analytics/selectors";
import {myQuizzesResultsType} from "../../types/analyticsTypes";
import {formatTimestamp} from "../../utils/convertDate";
import {mainUrls} from "../../config/urls";
import {NavLink} from "react-router-dom";
import {FaCloudDownloadAlt} from "react-icons/fa";
import {AppDispatch} from "../../redux/store";
import {fetchMyResults} from "../../redux/results/operations";

const columns = [
  {id: "name", label: "Name", minWidth: 150},
  {id: "company", label: "Company", minWidth: 150},
  {id: "score", label: "Score", minWidth: 50},
  {id: "last_quiz_run", label: "Last quiz run", minWidth: 50},
];

const UserTestsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector<boolean>(selectLoading);
  const myQuizzesResults = useSelector(selectMyQuizzesResults) as myQuizzesResultsType[];

  const handleDownloadMyResults = () => {
    dispatch(fetchMyResults())
  };

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        <Paper>
          <Typography variant="h6" marginTop={3}>
            Tests List
          </Typography>
          <Box align="center" margin={1}>
            <Button
              onClick={handleDownloadMyResults}
              variant="outlined"
              startIcon={<FaCloudDownloadAlt/>}
              color="primary"
            >
              Download My Results
            </Button>
          </Box>
          <TableContainer className={styles.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell sx={{backgroundColor: "#a4a4a4"}}
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
                {myQuizzesResults?.map((results) => (
                  <TableRow key={results.quiz_id} className={styles.tableRow}>
                    <TableCell sx={{padding: "8px"}} align="center">
                      <NavLink className={styles.link} to={mainUrls.analytics.myQuizzesAnalytics}>
                        {results.quiz_name}
                      </NavLink>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {results.company_name}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {results.average_score * 1000 / 10} %
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {formatTimestamp(results.last_attempt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )
  );
};

export default UserTestsList;
