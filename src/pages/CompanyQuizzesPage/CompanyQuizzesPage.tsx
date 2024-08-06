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
import Paper from "@mui/material/Paper";
import styles from "./CompanyQuizzesPage.module.css";
import {AppDispatch} from "../../redux/store";
import {selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {useParams} from "react-router-dom";
import {selectQuizzes} from "../../redux/quizzes/selectors";
import {addQuiz, deleteQuiz, fetchQuizzes} from "../../redux/quizzes/operations";
import AddQuizModal from "../../components/AddQuizModal/AddQuizModal";
import {useFormik} from "formik";
import {initialValueAddQuiz} from "../../initialValues/initialValues";
import {validationSchemaAddQuiz} from "../../validate/validationSchemaAddQuiz";
import {QuizResponseType} from "../../types/quizzesTypes";

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
  const quizzes = useSelector(selectQuizzes) as QuizResponseType[];
  const company = useSelector(selectCompanyById) as CompanyType;
  const [openAddQuizModal, setOpenAddQuizModal] = useState<boolean>(false);
  const [openDeleteQuizModal, setOpenDeleteQuizModal] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);

  const handleOpenAddQuizModal = () => setOpenAddQuizModal(true);
  const handleCloseAddQuizModal = () => {
    formikAddQuiz.resetForm();
    setOpenAddQuizModal(false);
  };

  useEffect(() => {
    // if (id) {
      dispatch(fetchQuizzes(id));
    // }
  },[])

  const formikAddQuiz = useFormik({
    initialValues: initialValueAddQuiz,
    validationSchema: validationSchemaAddQuiz,
    onSubmit: (values) => {
      if (formikAddQuiz.isValid) {
        console.log(company.id, values);
        // dispatch(addQuiz(company?.id, values));
      }
      handleCloseAddQuizModal();
    }
  });

  const handleOpenDeleteQuizModal = (quizId: string) => {
    setSelectedQuizId(quizId);
    setOpenDeleteQuizModal(true);
  };

  const closeModal = () => {
    setOpenAddQuizModal(false);
    setOpenDeleteQuizModal(false);
    setSelectedQuizId(null);
  };

  const handleDeleteQuiz = () => {
    if (id && selectedQuizId !== null) {
      dispatch(deleteQuiz(selectedQuizId));
      dispatch(fetchQuizzes(id));
    }
    closeModal();
  };

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
            <Box className={styles.addQuizButton}>
              <Button variant="contained"
                      onClick={handleOpenAddQuizModal}
              >
                + Add Quiz
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
                {quizzes.map((quiz: QuizResponseType) => (
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
                        onClick={() => handleOpenDeleteQuizModal(quiz.id)}
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

        {/*Add Quiz Modal*/}
        <AddQuizModal
          openModal={openAddQuizModal}
          closeModal={handleCloseAddQuizModal}
          style_close={styles.close}
          color_off={"primary"}
          style_title={styles.title_add}
          title={"Add Quiz"}
          formikAddQuiz={formikAddQuiz}
          name={"Name:"}
          description={"Description:"}
          questions={"Questions:"}
          answer_options={"Answer options:"}
          correct_answer={"Correct answer:"}
          frequency_days={"Frequency days:"}
        />

        {/* Delete Quiz Modal */}
        <BaseModalWindow
          openModal={openDeleteQuizModal}
          closeModal={closeModal}
          style_close={styles.close}
          color_off={"error"}
          style_title={styles.title_delete}
          title={"Delete Quiz"}
          text={"Are you sure you want to delete this quiz?"}
          onSubmit={handleDeleteQuiz}
          style_done={styles.done_leave}
        />
      </>
    )
  );
};

export default CompanyQuizzesPage;
