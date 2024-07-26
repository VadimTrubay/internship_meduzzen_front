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
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading, selectMyInvites} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./MyInvitesPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
// import {createInvite, deleteMember} from "../../redux/actions/operations";
import {AppDispatch} from "../../redux/store";
import {fetchMyInvites} from "../../redux/actions/operations";
// import {selectUsers} from "../../redux/users/selectors";
// import {selectCompanyById} from "../../redux/companies/selectors";
// import {UserType} from "../../types/usersTypes";
// import {CompanyType} from "../../types/companiesTypes";

const columns = [
  {id: "username", label: "Name", minWidth: 200},
  {id: "accept", label: "Accept", minWidth: 60},
  {id: "decline", label: "Decline", minWidth: 60},
];

const MyInvitesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const myInvites = useSelector(selectMyInvites) as memberType[];
  // const users = useSelector(selectUsers);
  // const [currentMember, setCurrentMember] = useState<memberType | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  // const companyId = useSelector<CompanyType>(selectCompanyById);
  const loading = useSelector<boolean>(selectLoading);

  console.log(myInvites)
  useEffect(() => {
    dispatch(fetchMyInvites())
  }, []);

  const handleOpenDeleteModal = (member: memberType) => {
    // setCurrentMember(member);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    // setCurrentMember(null);
  };

  const handleDeleteMember = () => {
    // if (currentMember) {
    // dispatch(deleteMember(currentMember?.id));
    handleCloseDeleteModal();
    // }
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
                {myInvites.map((invites: memberType) => (
                  <TableRow key={invites.id} className={styles.tableRow}>
                    <TableCell>
                      {invites?.user_username}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        // onClick={() => handleOpenDeleteModal(invites)}
                        variant="outlined"
                        color="success"
                        sx={{marginRight: 1}}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <Button
                        // onClick={() => handleOpenDeleteModal(invites)}
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

        {/*Delete modal*/}
        <Modal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseDeleteModal} color={"error"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_delete}>Delete member</Text>
              <Text>Are you sure you want to delete this member?</Text>
            </Typography>
            <StyledBox component="form" onSubmit={(e) => {
              e.preventDefault();
              handleDeleteMember();
            }}>
              <Button type="submit">
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
