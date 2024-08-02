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
import {selectError, selectLoading, selectMyInvites} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./MyInvitesPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {AppDispatch} from "../../redux/store";
import {acceptInvite, fetchMyInvites, declineInvite} from "../../redux/actions/operations";
import {memberType} from "../../types/actionsTypes";
import {UserType} from "../../types/usersTypes";
import {selectUser} from "../../redux/auth/selectors";
import toast from "react-hot-toast";


const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "accept", label: "Accept", minWidth: 60},
  {id: "decline", label: "Decline", minWidth: 60},
];


const MyInvitesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser) as UserType;
  const myInvites = useSelector(selectMyInvites) as memberType[];
  const [openAcceptInviteModal, setOpenAcceptInviteModal] = useState<boolean>(false)
  const [openDeclineInviteModal, setOpenDeclineInviteModal] = useState<boolean>(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);
  const error = useSelector<string>(selectError);


  useEffect(() => {
    dispatch(fetchMyInvites());
  }, [dispatch, error]);

  const handleOpenAcceptInviteModal = (inviteId: string) => {
    setSelectedActionId(inviteId);
    setOpenAcceptInviteModal(true);
  };

  const handleCloseAcceptInviteModal = () => {
    setOpenAcceptInviteModal(false);
    setSelectedActionId(null);
  };

  const handleOpenDeclineInviteModal = (inviteId: string) => {
    setSelectedActionId(inviteId);
    setOpenDeclineInviteModal(true);
  };

  const handleCloseDeclineInviteModal = () => {
    setOpenDeclineInviteModal(false);
    setSelectedActionId(null);
  };

  const handleAcceptInvite = () => {
    if (selectedActionId !== null) {
      dispatch(acceptInvite(selectedActionId));
      dispatch(fetchMyInvites());
      if (error) {
        toast.error(`Error accepting`);
      } else {
        toast.success(`Invite accept successfully`);
      }
    }
    handleCloseAcceptInviteModal();
  };

  const handleDeclineInvite = () => {
    if (selectedActionId !== null) {
      dispatch(declineInvite(selectedActionId));
      dispatch(fetchMyInvites());
      if (error) {
        toast.error(`Error declining`);
      } else {
        toast.success(`Invite decline successfully`);
      }
    }
    handleCloseDeclineInviteModal();
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
              My Invites
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
                {myInvites.map((invite: memberType) => (
                  <TableRow key={invite.id} className={styles.tableRow}>
                    <TableCell align="center">
                      {invite.company_name}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenAcceptInviteModal(invite.id)}
                        variant="outlined"
                        color="success"
                        sx={{marginRight: 1}}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenDeclineInviteModal(invite.id)}
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

        {/* Accept Invite Modal */}
        <Modal
          open={openAcceptInviteModal}
          onClose={handleCloseAcceptInviteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseAcceptInviteModal} color={"success"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_accept}>Accept Invite</Text>
              <Text>Are you sure you want to accept this invite?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleAcceptInvite} type="button">
                <DoneIcon sx={{fontSize: 40, color: "green"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>

        {/* Decline Invite Modal */}
        <Modal
          open={openDeclineInviteModal}
          onClose={handleCloseDeclineInviteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseDeclineInviteModal} color={"error"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_decline}>Decline Invite</Text>
              <Text>Are you sure you want to decline this invite?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleDeclineInvite} type="button">
                <DoneIcon sx={{fontSize: 40, color: "red"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>
      </>
    )
  );
};

export default MyInvitesPage;
