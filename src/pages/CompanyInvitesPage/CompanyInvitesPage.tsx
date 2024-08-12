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
import styles from "./CompanyInvitesPage.module.css";
import {AppDispatch} from "../../redux/store";
import {memberType} from "../../types/actionsTypes";
import {selectLoading} from "../../redux/actions/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import {deleteInvite, fetchCompanyInvites} from "../../redux/actions/operations";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {useParams} from "react-router-dom";


const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "options", label: "Options", minWidth: 60},
];


const CompanyInvitesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{id: string}>();
  const company = useSelector(selectCompanyById) as CompanyType;
  const companyInvites = useSelector(selectCompanyInvites) as memberType[];
  const [openDeleteInviteModal, setOpenDeleteInviteModal] = useState<boolean>(false);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const loading = useSelector<boolean>(selectLoading);


  useEffect(() => {
    if (id){
      dispatch(fetchCompanyInvites(id));
    }
  }, [id, dispatch])

  const handleOpenDeleteInviteModal = (inviteId: string) => {
    setSelectedActionId(inviteId);
    setOpenDeleteInviteModal(true);
  };

  const closeModal = () => {
    setOpenDeleteInviteModal(false);
    setSelectedActionId(null);
  };


  const handleDeleteInvite = () => {
    if (id && selectedActionId !== null) {
      dispatch(deleteInvite(selectedActionId));
      dispatch(fetchCompanyInvites(id));
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
              Company Invites
            </Typography>
            <Typography variant="h6">"{company?.name}"</Typography>
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
        <BaseModalWindow
          openModal={openDeleteInviteModal}
          closeModal={closeModal}
          style_close={styles.close}
          color_off={"error"}
          style_title={styles.title_delete}
          title={"Delete Invite"}
          text={"Are you sure you want to delete this invite?"}
          onSubmit={handleDeleteInvite}
          style_done={{color: "red", fontSize: 50}}
        />
      </>
    )
  );
};

export default CompanyInvitesPage;
