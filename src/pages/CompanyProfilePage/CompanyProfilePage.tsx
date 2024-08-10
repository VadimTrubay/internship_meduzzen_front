import React, {useEffect, useState} from "react";
import {Box, Button, Grid, LinearProgress, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyById, selectLoading} from "../../redux/companies/selectors";
import {FaEye, FaEyeSlash, FaInvision} from "react-icons/fa";
import styles from "../UserProfilePage/UserProfilePage.module.css";
import {deleteCompanyById, fetchCompanyById, updateCompany} from "../../redux/companies/operations";
import {useFormik} from "formik";
import {validationSchemaUpdateCompany} from "../../validate/validationSchemaUpdateCompany";
import {AppDispatch} from "../../redux/store";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate, useParams} from "react-router-dom";
import {initialValueUpdateCompany} from "../../initialValues/initialValues";
import {selectUser} from "../../redux/auth/selectors";
import {companies, mainUrls} from "../../config/urls";
import {fetchAdmins, fetchCompanyInvites, fetchCompanyRequests, fetchMembers} from "../../redux/actions/operations";
import {UserType} from "../../types/usersTypes";
import {CompanyType} from "../../types/companiesTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import EditCompanyModal from "../../components/EditCompanyModal/EditCompanyModal";
import {fetchQuizzes} from "../../redux/quizzes/operations";
import {IoPeopleCircleOutline} from "react-icons/io5";
import {MdQuiz, MdRequestQuote} from "react-icons/md";
import Paper from "@mui/material/Paper";
import {IoMdAnalytics} from "react-icons/io";
import {selectAdmins} from "../../redux/actions/selectors";
import {memberType} from "../../types/actionsTypes";


const CompanyProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditCompanyModal, setOpenEditCompanyModal] = useState<boolean>(false);
  const currentUser = useSelector(selectUser) as UserType;
  const companyById = useSelector(selectCompanyById) as CompanyType;
  const admins = useSelector(selectAdmins) as memberType[];
  const loading = useSelector<boolean>(selectLoading);


  const adminsListId = admins.map(admin => admin.user_id);

  const handleOpenEditCompanyModal = () => setOpenEditCompanyModal(true);
  const handleCloseEditCompanyModal = () => {
    formikEditCompany.resetForm();
    setOpenEditCompanyModal(false);

  };
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
      dispatch(fetchMembers(id));
      dispatch(fetchAdmins(id));
    }
  }, [id, dispatch])

  useEffect(() => {
    if (companyById) {
      formikEditCompany.setValues(companyById);
    }
  }, [companyById])

  const formikEditCompany = useFormik({
    initialValues: initialValueUpdateCompany,
    validationSchema: validationSchemaUpdateCompany,
    onSubmit: (values) => {
      if (formikEditCompany.isValid) {
        dispatch(updateCompany(values));
        dispatch(fetchCompanyById(companyById?.id));
        navigate(mainUrls.companies.byId(companyById?.id));
      }
      handleCloseEditCompanyModal();
    },
  });

  const handleDeleteCompany = () => {
    if (companyById) {
      dispatch(deleteCompanyById(companyById?.id));
      navigate(companies);
    }
    closeModal();
  };

  const handleOpenCompanyMembers = () => {
    if (companyById) {
      dispatch(fetchMembers(companyById?.id));
      navigate(mainUrls.actions.membersCompany(companyById?.id));
    }
  };

  const handleOpenCompanyInvites = () => {
    dispatch(fetchCompanyInvites(companyById?.id))
    navigate(mainUrls.actions.companyInvites(companyById?.id));
  };

  const handleOpenCompanyQuizzes = () => {
    dispatch(fetchQuizzes(companyById?.id))
    navigate(mainUrls.quizzes.companyQuizzes(companyById?.id));
  };
  const handleOpenCompanyRequests = () => {
    dispatch(fetchCompanyRequests(companyById?.id))
    navigate(mainUrls.actions.companyRequests(companyById?.id));
  };

  const closeModal = () => {
    setOpenEditCompanyModal(false);
    setOpenDeleteModal(false);
  };

  return (
    loading ?
      (
        <Box>
          <LinearProgress/>
        </Box>
      ) : (
        <Grid container spacing={4}>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Company Profile
            </Typography>
          </Grid>

          {/*Left: Profile */}
          <Grid item xs={6} md={4}>
            <Grid container direction="column" alignItems="center" spacing={1}>
              <Paper elevation={6} style={{padding: "20px"}}>
                <Box display="flex" justifyContent="center">
                  <Avatar/>
                </Box>
                <Grid item>
                  <Typography variant="h6" fontWeight="bold">
                    Name:
                  </Typography>
                  <Typography color="textSecondary">
                    {companyById ? companyById?.name : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" fontWeight="bold">
                    Description:
                  </Typography>
                  <Typography color="textSecondary">
                    {companyById ? companyById?.description : null}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" fontWeight="bold">
                    Visible:
                  </Typography>
                  <Typography color="textSecondary">
                    {companyById ? companyById?.visible ? <FaEye/> : <FaEyeSlash/> : null}
                  </Typography>
                </Grid>
                {currentUser?.id === companyById?.owner_id &&
                  <Box sx={{marginTop: 2}}>
                    <Button
                      onClick={handleOpenEditCompanyModal}
                      variant="outlined"
                      startIcon={<EditIcon/>}
                      color="primary"
                      sx={{marginRight: 2}}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={handleOpenDeleteModal}
                      variant="outlined"
                      startIcon={<DeleteIcon/>}
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                }
              </Paper>
            </Grid>
          </Grid>

          {/* Right: buttons actions */}
          <Grid item xs={6} md={2}>
            <Grid container direction="column" alignItems="flex-start" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                sx={{margin: 1}}
                onClick={() => handleOpenCompanyMembers()}
              >
                <IoPeopleCircleOutline style={{marginRight: '5px'}} size={24}/>
                Members
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{margin: 1}}
                onClick={() => handleOpenCompanyQuizzes()}
              >
                <MdQuiz style={{marginRight: '5px'}} size={24}/>
                Quizzes
              </Button>
              {currentUser?.id === companyById?.owner_id &&
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{margin: 1}}
                    onClick={() => handleOpenCompanyInvites()}
                  >
                    <FaInvision style={{marginRight: '5px'}} size={24}/>
                    Invites
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{margin: 1}}
                    onClick={() => handleOpenCompanyRequests()}
                  >
                    <MdRequestQuote style={{marginRight: '5px'}} size={24}/>
                    Requests
                  </Button>
                </>
              }
              {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) && (
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{margin: 1}}
                  // onClick={() => handleOpenCompanyRequests()}
                >
                  <IoMdAnalytics style={{marginRight: '5px'}} size={24}/>
                  Analytics
                </Button>
              )}
            </Grid>
          </Grid>

          {/* Edit modal */}
          <EditCompanyModal
            openModal={openEditCompanyModal}
            closeModal={handleCloseEditCompanyModal}
            style_close={styles.close}
            color_off={"primary"}
            style_title={styles.title_add_company}
            title={"Edit company"}
            formikEditCompany={formikEditCompany}
            name={"Name:"}
            description={"Description:"}
            visible={"Visible:"}
            style_done={{color: "primary", fontSize: 50}}
          />

          {/* Delete modal */}
          <BaseModalWindow
            openModal={openDeleteModal}
            closeModal={closeModal}
            style_close={styles.close}
            color_off={"error"}
            style_title={styles.title_delete}
            title={"Delete company"}
            text={"Are you sure you want to delete this company?"}
            onSubmit={handleDeleteCompany}
            style_done={{color: "red", fontSize: 50}}
          />
        </Grid>
      )
  );
};

export default CompanyProfilePage;
