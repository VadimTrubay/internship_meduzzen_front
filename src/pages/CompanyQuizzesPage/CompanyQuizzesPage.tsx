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
import {selectAdmins, selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {NavLink, useParams} from "react-router-dom";
import {selectQuizById, selectQuizzes} from "../../redux/quizzes/selectors";
import {addQuiz, deleteQuiz, fetchQuizById, fetchQuizzes, updateQuiz} from "../../redux/quizzes/operations";
import AddQuizModal from "../../components/AddQuizModal/AddQuizModal";
import {useFormik} from "formik";
import {initialValueAddQuiz, initialValueEditQuiz} from "../../initialValues/initialValues";
import {validationSchemaQuiz} from "../../validate/validationSchemaQuiz";
import {QuizByIdResponseType, QuizResponseType} from "../../types/quizzesTypes";
import {selectUser} from "../../redux/auth/selectors";
import {UserType} from "../../types/usersTypes";
import {fetchAdmins} from "../../redux/actions/operations";
import {memberType} from "../../types/actionsTypes";
import EditQuizModal from "../../components/EditQuizModal/EditQuizModal";
import {mainUrls} from "../../config/urls";


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
  const currentUser = useSelector(selectUser) as UserType;
  const companyById = useSelector(selectCompanyById) as CompanyType;
  const quizById = useSelector(selectQuizById) as QuizByIdResponseType;
  const admins = useSelector(selectAdmins) as memberType[];
  const [openAddQuizModal, setOpenAddQuizModal] = useState<boolean>(false);
  const [openEditQuizModal, setOpenEditQuizModal] = useState<boolean>(false);
  const [openDeleteQuizModal, setOpenDeleteQuizModal] = useState<boolean>(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);


  const adminsListId = admins.map(admin => admin.user_id);

  const handleOpenAddQuizModal = () => setOpenAddQuizModal(true);
  const handleCloseAddQuizModal = () => {
    formikAddQuiz.resetForm();
    setOpenAddQuizModal(false);
  };

  const handleOpenEditQuizModal = (id: string) => {
    dispatch(fetchQuizById(id));
    setOpenEditQuizModal(true);
  }
  const handleCloseEditQuizModal = () => {
    formikEditQuiz.resetForm();
    setOpenEditQuizModal(false);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchQuizzes(id));
      dispatch(fetchAdmins(id));
    }
  }, []);

  useEffect(() => {
    if (quizById) {
      formikEditQuiz.setValues(quizById);
    }
  }, [quizById])

  const formikAddQuiz = useFormik({
    initialValues: initialValueAddQuiz,
    validationSchema: validationSchemaQuiz,
    onSubmit: (values) => {
      if (formikAddQuiz.isValid) {
        dispatch(addQuiz({companyId: company.id, quizData: values}));
        if (id != null) {
          dispatch(fetchQuizzes(id));
        }
      }
      handleCloseAddQuizModal();
    },
  });


  const formikEditQuiz = useFormik({
    initialValues: initialValueEditQuiz,
    validationSchema: validationSchemaQuiz,
    onSubmit: (values) => {
      if (formikEditQuiz.isValid) {
        dispatch(updateQuiz(values));
        if (id != null) {
          dispatch(fetchQuizzes(id));
        }
      }
      handleCloseEditQuizModal();
    },
  });

  const handleOpenDeleteQuizModal = (quizId: string) => {
    setSelectedQuizId(quizId);
    setOpenDeleteQuizModal(true);
  };

  const closeModal = () => {
    setOpenAddQuizModal(false);
    setOpenDeleteQuizModal(false);
    setOpenEditQuizModal(false);
    setSelectedQuizId(null);
  };

  const handleDeleteQuiz = () => {
    if (id != null) {
      dispatch(fetchQuizzes(id));
    }
    if (selectedQuizId != null) {
      dispatch(deleteQuiz(selectedQuizId));
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
              {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) && (
                <Button variant="contained" onClick={handleOpenAddQuizModal}>
                  + Add Quiz
                </Button>
              )}
            </Box>
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
                {quizzes.map((quiz: QuizResponseType) => (
                  <TableRow key={quiz.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <NavLink className={styles.link} to={mainUrls.quizzes.viewQuiz(quiz.id)}>
                        {quiz.name}
                      </NavLink>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {quiz.description}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {quiz.frequency_days}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) && (
                        <Button
                          onClick={() => handleOpenEditQuizModal(quiz.id)}
                          variant="outlined"
                          color="primary"
                          sx={{marginRight: 1}}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) && (
                        <Button
                          onClick={() => handleOpenDeleteQuizModal(quiz.id)}
                          variant="outlined"
                          color="error"
                          sx={{marginRight: 1}}
                        >
                          Delete
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add Quiz Modal */}
        <AddQuizModal
          openModal={openAddQuizModal}
          closeModal={handleCloseAddQuizModal}
          style_close={styles.close}
          color_off={"primary"}
          style_title={styles.title_add}
          formikAddQuiz={formikAddQuiz}
          title={"Add Quiz"}
          title_name={"Name:"}
          title_description={"Description:"}
          title_frequency_days={"Frequency days:"}
          title_questions={"Questions:"}
          title_answer_options={"Answer options:"}
        />

        {/* Edit Quiz Modal */}
        <EditQuizModal
          openModal={openEditQuizModal}
          closeModal={handleCloseEditQuizModal}
          style_close={styles.close}
          color_off={"primary"}
          style_title={styles.title_add}
          formikEditQuiz={formikEditQuiz}
          title={"Edit Quiz"}
          title_name={"Name:"}
          title_description={"Description:"}
          title_frequency_days={"Frequency days:"}
          title_questions={"Questions:"}
          title_answer_options={"Answer options:"}
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
          style_done={{color: "red", fontSize: 50}}
        />
      </>
    )
  );
};

export default CompanyQuizzesPage;
