import React, {useEffect, useState} from "react";
import {Box, Button, Grid, LinearProgress, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyById, selectError, selectLoading} from "../../redux/companies/selectors";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import styles from "../UserProfilePage/UserProfilePage.module.css";
import toast from "react-hot-toast";
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
import {fetchCompanyInvites, fetchCompanyRequests, fetchMembers} from "../../redux/actions/operations";
import {UserType} from "../../types/usersTypes";
import {CompanyType, CompanyUpdateType} from "../../types/companiesTypes";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import EditCompanyModal from "../../components/EditCompanyModal/EditCompanyModal";


const CompanyProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditCompanyModal, setOpenEditCompanyModal] = useState<boolean>(false);
  const currentUser = useSelector(selectUser) as UserType;
  const companyById = useSelector(selectCompanyById) as CompanyUpdateType | CompanyType;
  const loading = useSelector<boolean>(selectLoading);
  const error = useSelector<string>(selectError);

  const handleOpenEditCompanyModal = () => setOpenEditCompanyModal(true);
  const handleCloseEditCompanyModal = () => {
    formikEditCompany.resetForm();
    setOpenEditCompanyModal(false);
  };
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);

  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
      if (error) {
        toast.error(`Error fetching company`);
      }
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
        if (error) {
          toast.error(`Error updating`)
        } else {
          toast.success(`Company edited successfully`)
        }
      }
      handleCloseEditCompanyModal();
    },
  });

  const handleDeleteCompany = () => {
    if (companyById) {
      dispatch(deleteCompanyById(companyById?.id));
      navigate(companies);
      if (error) {
        toast.error(`Error deleting`)
      } else {
        toast.success(`Company deleted successfully`)
      }
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
        <>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Company Profile
              </Typography>
            </Grid>
            <Button
              variant="outlined"
              color="success"
              sx={{margin: 1}}
              onClick={() => handleOpenCompanyMembers()}
            >
              Company Members
            </Button>
            {currentUser?.id === companyById?.owner_id &&
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{margin: 1}}
                  onClick={() => handleOpenCompanyInvites()}
                >
                  Company Invites
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{margin: 1}}
                  onClick={() => handleOpenCompanyRequests()}
                >
                  Company Requests
                </Button>
              </Box>
            }
            <Grid item xs={12}>
              <Avatar/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Name:
              </Typography>
              <Typography color="textSecondary">
                {companyById ? companyById?.name : null}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Description:
              </Typography>
              <Typography color="textSecondary">
                {companyById ? companyById?.description : null}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold">
                Visible:
              </Typography>
              <Typography color="textSecondary">
                {companyById ? companyById?.visible ? <FaEye/> : <FaEyeSlash/> : null}
              </Typography>
            </Grid>
            {currentUser?.id === companyById?.owner_id &&
              <Box marginTop={2}>
                <Button
                  onClick={handleOpenEditCompanyModal}
                  variant="outlined"
                  startIcon={<EditIcon/>}
                  color="primary"
                  sx={{marginRight: 1}}
                >
                  Edit Company
                </Button>
                <Button
                  onClick={handleOpenDeleteModal}
                  variant="outlined"
                  startIcon={<DeleteIcon/>}
                  color="error"
                >
                  Delete Company
                </Button>
              </Box>}
          </Grid>

          {/*Edit modal*/}
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
            style_done={styles.edit}
          />

          {/*Delete modal*/}
          <BaseModalWindow
            openModal={openDeleteModal}
            closeModal={closeModal}
            style_close={styles.close}
            color_off={"error"}
            style_title={styles.title_delete}
            title={"Delete company"}
            text={"Are you sure you want to delete this company?"}
            onSubmit={handleDeleteCompany}
            style_done={styles.done_leave}
          />
        </>
      )
  );
};

export default CompanyProfilePage;
