import React, {useEffect, useState} from "react";
import {
  Box, Button, Grid, LinearProgress, Menu, MenuItem, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Avatar
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading, selectAdmins} from "../../redux/actions/selectors";
import styles from "./CompanyMembersPage.module.css";
import {
  addAdminRole,
  deleteAdminRole,
  createInvite,
  deleteMember,
  fetchMembers,
  leaveFromCompany, fetchAdmins
} from "../../redux/actions/operations";
import {AppDispatch} from "../../redux/store";
import {selectUsers} from "../../redux/users/selectors";
import {selectCompanyById} from "../../redux/companies/selectors";
import {UserType} from "../../types/usersTypes";
import {CompanyType} from "../../types/companiesTypes";
import {fetchUsers} from "../../redux/users/operations";
import {selectUser} from "../../redux/auth/selectors";
import {useNavigate, useParams} from "react-router-dom";
import {mainUrls} from "../../config/urls";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";
import {formatTimestamp} from "../../utils/convertDate";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "username", label: "Name", minWidth: 120},
  {id: "role", label: "Role", minWidth: 80},
  {id: "change_role", label: "Change role", minWidth: 80},
  {id: "options", label: "Options", minWidth: 80},
  {id: "last_quiz_run", label: "Last quiz run", minWidth: 80},
];

const CompanyMembersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{ id: string }>();
  const members = useSelector(selectMembers) as memberType[];
  const users = useSelector(selectUsers) as UserType[];
  const admins = useSelector(selectAdmins) as memberType[];
  const companyById = useSelector(selectCompanyById) as CompanyType;
  const currentUser = useSelector(selectUser) as UserType;
  const [currentMember, setCurrentMember] = useState<memberType | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openLeaveModal, setOpenLeaveModal] = useState<boolean>(false);
  const [openChangeRoleModal, setOpenChangeRoleModal] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const company = useSelector(selectCompanyById) as CompanyType;
  const loading = useSelector<boolean>(selectLoading);
  const navigate = useNavigate();
  const skip = 1;
  const limit = 100;


  const adminsListId = admins.map(admin => admin.user_id);

  useEffect(() => {
    if (id) {
      dispatch(fetchUsers({skip, limit}));
    }
  }, [id, dispatch, currentMember]);

  const handleOpenDeleteModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenDeleteModal(true);
  };

  const closeModal = () => {
    setOpenChangeRoleModal(false);
    setOpenLeaveModal(false);
    setOpenDeleteModal(false);
    setCurrentMember(null);
  };

  const handleDeleteMember = () => {
    if (currentMember && id) {
      dispatch(deleteMember(currentMember?.action_id));
      dispatch(fetchMembers(id));
    }
    closeModal();
  };

  const handleOpenLeaveModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenLeaveModal(true);
  };

  const handleLeave = () => {
    if (currentMember && id) {
      dispatch(leaveFromCompany(currentMember?.action_id));
      dispatch(fetchMembers(id));
    }
    closeModal();
  };

  const handleOpenChangeRoleModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenChangeRoleModal(true);
  };

  const handleChangeRole = () => {
    if (currentMember) {
      dispatch(fetchMembers(company?.id))
      if (currentMember?.role === "user") {
        dispatch(addAdminRole({companyId: currentMember?.company_id, userId: currentMember?.user_id}));
      }
      if (currentMember?.role === "admin") {
        dispatch(deleteAdminRole({companyId: currentMember?.company_id, userId: currentMember?.user_id}));
      }
    }
    dispatch(fetchAdmins(company.id));
    closeModal();
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
    }
    handleCloseMenu();
  };

  const handleCompanyAdmins = () => {
    if (company) {
      navigate(mainUrls.actions.adminsCompany(company.id))
    }
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
          <Typography variant="h6">"{company?.name}"</Typography>
        </Grid>
        {currentUser?.id === company?.owner_id && (
          <Box className={styles.inviteMemberButton}>
            <Button variant="outlined" onClick={handleOpenMenu} color="success" sx={{marginRight: 1}}>
              + Invite member
            </Button>
            <Button variant="outlined" onClick={handleCompanyAdmins} color="primary">
              Company Admins
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
                <TableRow key={member?.id} className={styles.tableRow}>
                  <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                    <Avatar className={styles.avatar}/>
                  </TableCell>
                  <TableCell align="center">{member?.user_username}</TableCell>
                  <TableCell align="center">{member?.role}</TableCell>
                  <TableCell align="center">
                    {currentUser?.id !== member?.user_id && currentUser?.id === company?.owner_id ?
                      (<Button
                        onClick={() => handleOpenChangeRoleModal(member)}
                        variant="outlined"
                        color="primary"
                        sx={{marginRight: 1}}
                      >
                        Change Role
                      </Button>) : null
                    }
                  </TableCell>
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
                    ) : currentUser?.id === member?.user_id && currentUser?.id !== company?.owner_id ? (
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
                  <TableCell align="center">
                    {(currentUser?.id === companyById?.owner_id || adminsListId.includes(currentUser?.id)) &&
                      formatTimestamp(member.last_quiz_attempt)}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete modal */}
      <BaseModalWindow
        openModal={openDeleteModal}
        closeModal={closeModal}
        style_close={styles.close}
        color_off={"error"}
        style_title={styles.title_delete}
        title={"Delete member"}
        text={"Are you sure you want to delete this member?"}
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteMember();
        }}
        style_done={{color: "red", fontSize: 50}}
      />

      {/* Leave modal */}
      <BaseModalWindow
        openModal={openLeaveModal}
        closeModal={closeModal}
        style_close={styles.close}
        color_off={"error"}
        style_title={styles.title_delete}
        title={"Leave from company"}
        text={"Are you sure you want to leave from this company?"}
        onSubmit={(e) => {
          e.preventDefault();
          handleLeave();
        }}
        style_done={{color: "red", fontSize: 50}}
      />

      {/* Change role modal */}
      <BaseModalWindow
        openModal={openChangeRoleModal}
        closeModal={closeModal}
        style_close={styles.close}
        color_off={"primary"}
        style_title={styles.title_change_role}
        title={"Change Role"}
        text={"Are you sure you want to change role from this user?"}
        onSubmit={(e) => {
          e.preventDefault();
          handleChangeRole();
        }}
        style_done={{color: "primary", fontSize: 50}}
      />
    </>
);
};

export default CompanyMembersPage;
