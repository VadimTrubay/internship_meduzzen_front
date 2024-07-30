import React, {useEffect, useState} from "react";
import {
  Box, Button,
  Grid,
  LinearProgress, Modal,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectCompanyRequests, selectError} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./CompanyRequestsPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {AppDispatch} from "../../redux/store";
import {memberType} from "../../types/actionsTypes";
import toast from "react-hot-toast";
import {selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import {acceptRequest, declineRequest, fetchCompanyRequests} from "../../redux/actions/operations";


const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "accept", label: "Accept", minWidth: 60},
  {id: "decline", label: "Decline", minWidth: 60},
];


const CompanyRequestsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(selectCompanyById) as CompanyType;
  const companyRequests = useSelector(selectCompanyRequests) as memberType[];
  const [openAcceptRequestModal, setOpenAcceptRequestModal] = useState<boolean>(false)
  const [openDeclineRequestModal, setOpenDeclineRequestModal] = useState<boolean>(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);
  const error = useSelector<string>(selectError);


  useEffect(() => {
    dispatch(fetchCompanyRequests(company?.id));
  }, [dispatch, error]);

  const handleOpenAcceptRequestModal = (requestId: string) => {
    setSelectedActionId(requestId);
    setOpenAcceptRequestModal(true);
  };

  const handleCloseAcceptRequestModal = () => {
    setOpenAcceptRequestModal(false);
    setSelectedActionId(null);
  };

  const handleOpenDeclineRequestModal = (requestId: string) => {
    setSelectedActionId(requestId);
    setOpenDeclineRequestModal(true);
  };

  const handleCloseDeclineRequestModal = () => {
    setOpenDeclineRequestModal(false);
    setSelectedActionId(null);
  };

  const handleAcceptRequest = () => {
    if (selectedActionId !== null) {
      dispatch(acceptRequest(selectedActionId));
      if (error) {
        toast.error(`Error accepting`);
      } else {
        toast.success(`Request accept successfully`);
      }
    }
    handleCloseAcceptRequestModal();
  };

  const handleDeclineRequest = () => {
    if (selectedActionId !== null) {
      dispatch(declineRequest(selectedActionId));
      if (error) {
        toast.error(`Error declining`);
      } else {
        toast.success(`Request decline successfully`);
      }
    }
    handleCloseDeclineRequestModal();
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
              Company Requests
            </Typography>
            <Typography variant="h6">
              Company: "{company?.name}"
            </Typography>
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
                {companyRequests.map((request: memberType) => (
                  <TableRow key={request.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {request.user_username}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenAcceptRequestModal(request.id)}
                        variant="outlined"
                        color="success"
                        sx={{marginRight: 1}}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenDeclineRequestModal(request.id)}
                        variant="outlined"
                        color="error"
                        sx={{marginRight: 1}}
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Accept Request Modal */}
        <Modal
          open={openAcceptRequestModal}
          onClose={handleCloseAcceptRequestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseAcceptRequestModal} color={"success"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_accept}>Accept Request</Text>
              <Text>Are you sure you want to accept this request?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleAcceptRequest} type="button">
                <DoneIcon sx={{fontSize: 40, color: "green"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>

        {/* Decline Request Modal */}
        <Modal
          open={openDeclineRequestModal}
          onClose={handleCloseDeclineRequestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseDeclineRequestModal} color={"error"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_decline}>Decline Request</Text>
              <Text>Are you sure you want to decline this request?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleDeclineRequest} type="button">
                <DoneIcon sx={{fontSize: 40, color: "red"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>
      </>
    )
  );
};

export default CompanyRequestsPage;
