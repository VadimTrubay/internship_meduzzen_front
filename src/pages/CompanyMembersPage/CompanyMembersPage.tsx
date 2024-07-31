import React, {useEffect, useState} from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading, selectError} from "../../redux/actions/selectors";
import styles from "./CompanyMembersPage.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {createInvite, deleteMember, leaveFromCompany} from "../../redux/actions/operations";
import {AppDispatch} from "../../redux/store";
import {selectUsers} from "../../redux/users/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {UserType} from "../../types/usersTypes";
import {CompanyType} from "../../types/companiesTypes";
import toast from "react-hot-toast";
import {fetchUsers} from "../../redux/users/operations";
import {selectUser} from "../../redux/auth/selectors";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "username", label: "Name", minWidth: 120},
  {id: "role", label: "Role", minWidth: 80},
  {id: "options", label: "Options", minWidth: 120},
];

const CompanyMembersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector(selectMembers) as memberType[];
  const users = useSelector(selectUsers);
  const currentUser = useSelector(selectUser);
  const [currentMember, setCurrentMember] = useState<memberType | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openLeaveModal, setOpenLeaveModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const company = useSelector(selectCompanyById) as CompanyType;
  const loading = useSelector<boolean>(selectLoading);
  const skip = 1;
  const limit = 100;
  const error = useSelector<boolean>(selectError);


  useEffect(() => {
    dispatch(fetchUsers({skip, limit}));
  }, [dispatch, error]);

  const handleOpenDeleteModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setCurrentMember(null);
  };

  const handleDeleteMember = () => {
    if (currentMember) {
      dispatch(deleteMember(currentMember.id));
      if (error) {
        toast.error(`Error deleting`);
      } else {
        toast.success(`Member deleted successfully`);
      }
    }
    handleCloseDeleteModal();
  };

  const handleOpenLeaveModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenLeaveModal(true);
  };

  const handleCloseLeaveModal = () => {
    setOpenLeaveModal(false);
    setCurrentMember(null);
  };

  const handleLeave = () => {
    if (currentMember) {
      dispatch(leaveFromCompany(currentMember.id));
      if (error) {
        toast.error(`Error leaving from company`);
      } else {
        toast.success(`Member left successfully`);
      }
    }
    handleCloseLeaveModal();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleInviteUser = (userId: string) => {
    if (userId && company) {
      dispatch(createInvite({userId: userId, companyId: company.id}));
      if (error) {
        toast.error(`User already invited`);
      } else {
        toast.success(`Invite created successfully`);
      }
    }
    handleCloseMenu();
  };

  return loading ? (
    <Box>
      <LinearProgress/>
    </Box>
  ) : (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Company Members
          </Typography>
          <Typography variant="h6">Company: "{company?.name}"</Typography>
        </Grid>
        {currentUser?.id === company?.owner_id && (
          <Box className={styles.inviteMemberButton}>
            <Button variant="outlined" onClick={handleOpenMenu} color="success">
              + Invite member
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              {users?.filter((user: UserType) => user?.id !== company?.owner_id)
                .map((user: UserType) => (
                  <MenuItem key={user?.id} onClick={() => handleInviteUser(user?.id)}>
                    {user?.username}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        )}
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
              {members.map((member: memberType) => (
                <TableRow key={member.id} className={styles.tableRow}>
                  <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                    <Avatar className={styles.avatar}/>
                  </TableCell>
                  <TableCell align="center">{member.user_username}</TableCell>
                  <TableCell align="center">{member.role}</TableCell>
                  <TableCell sx={{padding: "3px"}} align="center">
                    {currentUser?.id === company?.owner_id && currentUser?.id !== member?.user_id ? (
                      <Button
                        onClick={() => handleOpenDeleteModal(member)}
                        variant="outlined"
                        color="error"
                        sx={{marginRight: 1}}
                      >
                        Delete member
                      </Button>
                    ) : currentUser?.id === member?.user_id ? (
                      <Button
                        onClick={() => handleOpenLeaveModal(member)}
                        variant="outlined"
                        color="error"
                        sx={{marginRight: 1}}
                      >
                        Leave From Company
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete modal */}
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
          <StyledBox
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteMember();
            }}
          >
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "red"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>

      {/* Leave modal */}
      <Modal
        open={openLeaveModal}
        onClose={handleCloseLeaveModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles.close}>
            <HighlightOffIcon onClick={handleCloseLeaveModal} color={"error"}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={styles.title_delete}>Leave from company</Text>
            <Text>Are you sure you want to leave from this company?</Text>
          </Typography>
          <StyledBox
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLeave();
            }}
          >
            <Button type="submit">
              <DoneIcon sx={{fontSize: 40, color: "red"}}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>
    </>
  );
};

export default CompanyMembersPage;
