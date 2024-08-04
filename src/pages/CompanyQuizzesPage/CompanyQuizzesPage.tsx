import React, {useEffect, useState} from "react";
import {
  Box, Button,
  Grid,
  LinearProgress,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyInvites, selectError} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./CompanyQuizzesPage.module.css";
import {AppDispatch} from "../../redux/store";
import {memberType} from "../../types/actionsTypes";
import {selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import {deleteInvite, fetchCompanyInvites} from "../../redux/actions/operations";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {useParams} from "react-router-dom";
import {selectQuizzes} from "../../redux/quizzes/selectors";
import {QuizType} from "../../types/quizzesTypes";
import {fetchCompanyQuizzes} from "../../redux/quizzes/operations";


const columns = [
  {id: "name", label: "Name", minWidth: 100},
  {id: "description", label: "Description", minWidth: 250},
  {id: "frequency_days", label: "Frequency days", minWidth: 60},
  {id: "edit", label: "Edit", minWidth: 80},
  {id: "delete", label: "Delete", minWidth: 80},
];


const CompanyQuizzesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{ id: string }>();
  const quizzes = useSelector(selectQuizzes) as QuizType[];
  const company = useSelector(selectCompanyById) as CompanyType;
  // const [openDeleteInviteModal, setOpenDeleteInviteModal] = useState<boolean>(false);
  // const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);
  //
  //
  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyQuizzes(id));
    }
  }, [id, dispatch])
  //
  // const handleOpenDeleteInviteModal = (inviteId: string) => {
  //   setSelectedActionId(inviteId);
  //   setOpenDeleteInviteModal(true);
  // };
  //
  // const closeModal = () => {
  //   setOpenDeleteInviteModal(false);
  //   setSelectedActionId(null);
  // };
  //
  //
  // const handleDeleteInvite = () => {
  //   if (id && selectedActionId !== null) {
  //     dispatch(deleteInvite(selectedActionId));
  //     dispatch(fetchCompanyInvites(id));
  //   }
  //   closeModal();
  // };

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
              Company Quizzes
            </Typography>
            <Typography variant="h6">
              Quizzes: "{company?.name}"
            </Typography>
            <Box className={styles.addQuizzButton}>
              <Button variant="contained"
                      // onClick={handleOpenAddQuizzModal}
              >
                + Add Quizz
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Paper>
          <TableContainer className={styles.table}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
                {quizzes.map((quiz: QuizType) => (
                  <TableRow key={quiz.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {quiz.name}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {quiz.description}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {quiz.frequency_days}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <Button
                        // onClick={() => handleOpenDeleteInviteModal(invite.id)}
                        variant="outlined"
                        color="primary"
                        sx={{marginRight: 1}}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <Button
                        // onClick={() => handleOpenDeleteInviteModal(invite.id)}
                        variant="outlined"
                        color="error"
                        sx={{marginRight: 1}}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/*/!* Delete Invite Modal *!/*/}
        {/*<BaseModalWindow*/}
        {/*  openModal={openDeleteInviteModal}*/}
        {/*  closeModal={closeModal}*/}
        {/*  style_close={styles.close}*/}
        {/*  color_off={"error"}*/}
        {/*  style_title={styles.title_delete}*/}
        {/*  title={"Delete Invite"}*/}
        {/*  text={"Are you sure you want to delete this invite?"}*/}
        {/*  onSubmit={handleDeleteInvite}*/}
        {/*  style_done={styles.done_leave}*/}
        {/*/>*/}
      </>
    )
  );
};

export default CompanyQuizzesPage;
