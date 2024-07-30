import React, {useState} from "react";
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
import {selectCompanyInvites, selectError} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./CompanyInvitesPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {AppDispatch} from "../../redux/store";
import {memberType} from "../../types/actionsTypes";
import toast from "react-hot-toast";
import {selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import {deleteInvite, fetchCompanyInvites} from "../../redux/actions/operations";


const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "options", label: "Options", minWidth: 60},
];


const CompanyInvitesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const company = useSelector(selectCompanyById) as CompanyType;
  const companyInvites = useSelector(selectCompanyInvites) as memberType[];
  const [openDeleteInviteModal, setOpenDeleteInviteModal] = useState<boolean>(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);
  const error = useSelector<string>(selectError);


  const handleOpenDeleteInviteModal = (inviteId: string) => {
    setSelectedActionId(inviteId);
    setOpenDeleteInviteModal(true);
  };

  const handleCloseDeleteInviteModal = () => {
    setOpenDeleteInviteModal(false);
    setSelectedActionId(null);
  };


  const handleDeleteInvite = () => {
    if (selectedActionId !== null) {
      dispatch(deleteInvite(selectedActionId));
      dispatch(fetchCompanyInvites(company.id));
      if (error) {
        toast.error(`Error deleting`);
      } else {
        toast.success(`Invite deleted successfully`);
      }
    }
    handleCloseDeleteInviteModal();
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
              Company Invites
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
                {companyInvites.map((invite: memberType) => (
                  <TableRow key={invite.id} className={styles.tableRow}>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {invite.user_username}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <Button
                        onClick={() => handleOpenDeleteInviteModal(invite.id)}
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

        {/* Delete Invite Modal */}
        <Modal
          open={openDeleteInviteModal}
          onClose={handleCloseDeleteInviteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseDeleteInviteModal} color={"error"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_decline}>Delete Invite</Text>
              <Text>Are you sure you want to delete this invite?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleDeleteInvite} type="button">
                <DoneIcon sx={{fontSize: 40, color: "red"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>
      </>
    )
  );
};

export default CompanyInvitesPage;
