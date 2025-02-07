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
import {selectAdmins, selectLoading, selectMembers} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {selectQuizById, selectQuizzes} from "../../redux/quizzes/selectors";
import {
  addQuiz,
  deleteQuiz,
  fetchQuizById,
  fetchQuizzes,
  sendExelFile,
  updateQuiz
} from "../../redux/quizzes/operations";
import AddQuizModal from "../../components/AddQuizModal/AddQuizModal";
import {useFormik} from "formik";
import {initialValueAddQuiz, initialValueEditQuiz} from "../../initialValues/initialValues";
import {validationSchemaQuiz} from "../../validate/validationSchemaQuiz";
import {QuizByIdResponseType, QuizResponseType} from "../../types/quizzesTypes";
import {selectUser} from "../../redux/auth/selectors";
import {UserType} from "../../types/usersTypes";
import {memberType} from "../../types/actionsTypes";
import EditQuizModal from "../../components/EditQuizModal/EditQuizModal";
import {mainUrls} from "../../config/urls";
import {FaCloudDownloadAlt} from "react-icons/fa";
import FileUploadModal from "../../components/FileUploadModal/FileUploadModal";


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
  const members = useSelector(selectMembers) as memberType[];
  const navigate = useNavigate();
  const [openAddQuizModal, setOpenAddQuizModal] = useState<boolean>(false);
  const [openEditQuizModal, setOpenEditQuizModal] = useState<boolean>(false);
  const [openDeleteQuizModal, setOpenDeleteQuizModal] = useState<boolean>(false);
  const [openFileUploadModal, setOpenFileUploadModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);
  const [importFile, setImportFile] = useState<boolean>(false);
  const loading = useSelector<boolean>(selectLoading);

  const adminsListId = admins.map(admin => admin.user_id);
  const membersListId = members.map(member => member.user_id);

  const handleOpenFileUploadModal = () => {
    setOpenFileUploadModal(true);

  };
  const handleCloseFileUploadModal = () => {
    setOpenFileUploadModal(false);

  };
  const handleFileUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    dispatch(sendExelFile({companyId: id, file: formData}));
    setImportFile(true);
  };

  useEffect(() => {
    if (importFile) {
      setTimeout(
        () => {
          dispatch(fetchQuizzes(companyById?.id));
          setImportFile(false);
        },
        1000
      )
    }
  }, [importFile])

  useEffect(() => {
    if (quizById) {
      formikEditQuiz.setValues(quizById);
    }
  }, [quizById])

  useEffect(() => {
    if (companyById) {
      dispatch(fetchQuizzes(companyById?.id));
    }
  }, [])

  const handleOpenAddQuizModal = () => setOpenAddQuizModal(true);
  const handleCloseAddQuizModal = () => {
    formikAddQuiz.resetForm();
    setOpenAddQuizModal(false);
  };

  const handleOpenEditQuizModal = (id: string) => {
    setSelectedQuizId(id);
    dispatch(fetchQuizById(id));
    setOpenEditQuizModal(true);
  }

  const handleOpenDeleteQuizModal = (id: string) => {
    setSelectedQuizId(id);
    dispatch(fetchQuizById(id));
    setOpenDeleteQuizModal(true);
  };

  const handleCloseEditQuizModal = () => {
    formikEditQuiz.resetForm();
    setOpenEditQuizModal(false);
  };

  const handleDeleteQuiz = () => {
    if (id && selectedQuizId != null) {
      dispatch(deleteQuiz(selectedQuizId));
      dispatch(fetchQuizzes(id));
    }
    closeModal();
  };

  const formikAddQuiz = useFormik({
    initialValues: initialValueAddQuiz,
    validationSchema: validationSchemaQuiz,
    onSubmit: (values) => {
      if (formikAddQuiz.isValid) {
        dispatch(addQuiz({companyId: company?.id, data: values}));
        if (id != null) {
          dispatch(fetchQuizzes(id));
          navigate(mainUrls.companies.byId(id))
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
      }
      handleCloseEditQuizModal();
    },
  });


  const closeModal = () => {
    setOpenAddQuizModal(false);
    setOpenDeleteQuizModal(false);
    setOpenEditQuizModal(false);
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
            <Typography variant="h6">"{company?.name}"</Typography>
            <Box className={styles.addQuizButton}>
              {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) && (
                <>
                  <Button sx={{marginRight: "5px"}} variant="contained" onClick={handleOpenAddQuizModal}>
                    + Add Quiz
                  </Button>
                  <Button
                    onClick={handleOpenFileUploadModal}
                    variant="contained"
                    startIcon={<FaCloudDownloadAlt/>}
                    color="primary"
                  >
                    Import Exel
                  </Button>
                </>
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
                {quizzes?.map((quiz: QuizResponseType, index) => (
                  <TableRow key={quiz.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {(currentUser?.id === companyById?.owner_id || membersListId.includes(currentUser?.id)) ? (
                        <NavLink className={styles.link} to={mainUrls.quizzes.viewQuiz(quiz.id)}>
                          {quiz.name}
                        </NavLink>
                      ) : (
                        quiz.name
                      )}
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

        {/* Add Quiz Modal */
        }
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

        {/* Edit Quiz Modal */
        }
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

        {/* Delete Quiz Modal */
        }
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

        {/* File Upload Modal */
        }
        <FileUploadModal
          openModal={openFileUploadModal}
          closeModal={handleCloseFileUploadModal}
          onSubmit={handleFileUpload}
        />
      </>
    )
  )
    ;
};

export default CompanyQuizzesPage;
