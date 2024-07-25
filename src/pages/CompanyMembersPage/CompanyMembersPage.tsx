import React, {useEffect, useState} from "react";
import {
  Box, Button,
  Grid,
  LinearProgress, Modal, Pagination,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./CompanyMembersPage.module.css";
import Avatar from "@mui/material/Avatar";
import {style, StyledBox, Text} from "./CompanyMembers.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";


const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50, align: "center"},
  {id: "username", label: "Username", minWidth: 120, align: "center"},
  {id: "options", label: "Options", minWidth: 120, align: "center"},
];

const CompanyMembersPage: React.FC = () => {
  const dispatch = useDispatch();
  const members = useSelector<memberType[]>(selectMembers);
  const [currentMember, setCurrentMember] = useState<memberType>(null);
  const loading = useSelector<boolean>(selectLoading);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleOpenDeleteModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCurrentMember(null);
  };

  const handleDeleteMember = () => {
    console.log(currentMember)
    // if (currentMember) {
    //   dispatch(deleteMemberById(currentMember.id));
    //   handleCloseDeleteModal();
    // }
  };

  const closeModal = () => {
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
              <Typography variant="h4" gutterBottom>
                COMPANY MEMBERS
              </Typography>
            </Grid>
          </Grid>
          <Paper>
            <TableContainer className={styles.table}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
                      <TableCell sx={{backgroundColor: "#a4a4a4"}}
                                 key={column.id}
                                 align={column.align}
                                 style={{minWidth: column.minWidth}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className={styles.tableHead}>
                  {members?.map((member: memberType) => (
                    <TableRow key={member.id} className={styles.tableRow}>
                      <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                        <Avatar className={styles.avatar}/>
                      </TableCell>
                      <TableCell align="center">
                        {member.user_username}
                      </TableCell>
                      <TableCell sx={{padding: "3px"}} align="center">
                        <Button
                          onClick={() => handleOpenDeleteModal(member)}
                          variant="outlined"
                          color="error"
                          sx={{marginRight: 1}}>
                          Delete member
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/*<Box sx={{display: "flex", justifyContent: "center", marginTop: 4}}>*/}
            {/*  <Pagination*/}
            {/*    count={countPage}*/}
            {/*    page={skip}*/}
            {/*    onChange={handleChangePage}*/}
            {/*    color={"primary"}/>*/}
            {/*</Box>*/}
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
                <HighlightOffIcon onClick={closeModal} color={"error"}/>
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
  )
    ;
};

export default CompanyMembersPage;
