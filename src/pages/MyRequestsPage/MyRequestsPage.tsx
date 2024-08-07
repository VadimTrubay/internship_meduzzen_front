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
import {selectError, selectLoading, selectMyRequests} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./MyRequestsPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {AppDispatch} from "../../redux/store";
import {memberType} from "../../types/actionsTypes";
import {UserType} from "../../types/usersTypes";
import {selectUser} from "../../redux/auth/selectors";
import {deleteRequest, fetchMyRequests} from "../../redux/actions/operations";


const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "options", label: "Options", minWidth: 60},
];


const MyRequestsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser) as UserType;
  const myRequests = useSelector(selectMyRequests) as memberType[];
  const [openDeleteRequestModal, setOpenDeleteRequestModal] = useState<boolean>(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);


  useEffect(() => {
    dispatch(fetchMyRequests());
  }, [dispatch]);

  const handleOpenDeleteRequestModal = (requestId: string) => {
    setSelectedActionId(requestId);
    setOpenDeleteRequestModal(true);
  };

  const handleCloseDeleteRequestModal = () => {
    setOpenDeleteRequestModal(false);
    setSelectedActionId(null);
  };

  const handleDeleteRequest = () => {
    if (selectedActionId !== null) {
      dispatch(deleteRequest(selectedActionId));
      dispatch(fetchMyRequests());
    }
    handleCloseDeleteRequestModal();
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
              My Requests
            </Typography>
            <Typography variant="h6">
              Profile: "{user?.username}"
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
                {myRequests.map((invite: memberType) => (
                  <TableRow key={invite.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {invite.company_name}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenDeleteRequestModal(invite.id)}
                        variant="outlined"
                        color="error"
                        sx={{marginRight: 1}}
                      >
                        Delete Request
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Delete Request Modal */}
        <Modal
          open={openDeleteRequestModal}
          onClose={handleCloseDeleteRequestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseDeleteRequestModal} color={"error"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_decline}>Delete Request</Text>
              <Text>Are you sure you want to delete this request?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleDeleteRequest} type="button">
                <DoneIcon sx={{fontSize: 50, color: "red"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>
      </>
    )
  );
};

export default MyRequestsPage;
