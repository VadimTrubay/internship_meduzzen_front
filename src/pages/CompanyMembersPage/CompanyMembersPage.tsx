import React, {useEffect, useState} from "react";
import {
  Box, Button,
  Grid,
  LinearProgress, Menu, MenuItem, Modal,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading, selectError} from "../../redux/actions/selectors";
import Paper from "@mui/material/Paper";
import styles from "./CompanyMembersPage.module.css";
import Avatar from "@mui/material/Avatar";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import {createInvite, deleteMember} from "../../redux/actions/operations";
import {AppDispatch} from "../../redux/store";
import {selectUsers} from "../../redux/users/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {UserType} from "../../types/usersTypes";
import {CompanyType} from "../../types/companiesTypes";
import toast, {Toaster} from "react-hot-toast";
import {fetchUsers} from "../../redux/users/operations";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "username", label: "Name", minWidth: 120},
  {id: "options", label: "Options", minWidth: 120},
];

const CompanyMembersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector(selectMembers) as memberType[];
  const users = useSelector(selectUsers);
  const [currentMember, setCurrentMember] = useState<memberType | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const company = useSelector(selectCompanyById) as CompanyType;
  const loading = useSelector<boolean>(selectLoading);
  const skip = 1;
  const limit = 100;
  const error = useSelector<boolean>(selectError);


  useEffect(() => {
    dispatch(fetchUsers({skip, limit}));
  }, [dispatch]);

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
      dispatch(deleteMember(currentMember?.id));
      handleCloseDeleteModal();
    }
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleInviteUser = (userId: string) => {
    if (userId && company) {
      dispatch(createInvite({user_id: userId, company_id: company.id}));
    }
    handleCloseMenu();
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
              Company Members
            </Typography>
            <Typography variant="h6">
              Company: "{company?.name}"
            </Typography>
          </Grid>
          <Box className={styles.inviteMemberButton}>
            <Button
              variant="outlined"
              onClick={handleOpenMenu}
              color="success"
            >
              + Invite member
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              {users?.filter((user: UserType) => user?.id !== company?.owner_id)
                .map((user: UserType) => (
                  <MenuItem
                    key={user?.id}
                    onClick={() => handleInviteUser(user?.id)}
                  >
                    {user?.username}
                  </MenuItem>
                ))}
            </Menu>
          </Box>
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
                {members.map((member: memberType) => (
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
                        sx={{marginRight: 1}}
                      >
                        Delete member
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

        <Toaster position="top-center"/>
      </>
    )
  );
};

export default CompanyMembersPage;
