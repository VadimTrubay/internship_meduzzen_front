import React, {useEffect, useState} from "react";
import {
  Box, Button, Grid, LinearProgress, Menu, MenuItem, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Avatar
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers, selectLoading, selectError} from "../../redux/actions/selectors";
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
import toast from "react-hot-toast";
import {fetchUsers} from "../../redux/users/operations";
import {selectUser} from "../../redux/auth/selectors";
import {useNavigate} from "react-router-dom";
import {mainUrls} from "../../config/urls";
import BaseModalWindow from "../../components/BaseModalWindow/BaseModalWindow";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "username", label: "Name", minWidth: 120},
  {id: "role", label: "Role", minWidth: 80},
  {id: "change_role", label: "Change role", minWidth: 80},
  {id: "options", label: "Options", minWidth: 80},
];

const CompanyMembersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const members = useSelector(selectMembers) as memberType[];
  const users = useSelector(selectUsers) as UserType[];
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
  const error = useSelector<boolean>(selectError);


  useEffect(() => {
    dispatch(fetchUsers({skip, limit}));
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(fetchMembers(company.id));
  }, [dispatch, currentMember]);

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
    if (currentMember) {
      dispatch(deleteMember(currentMember.id));
      if (error) {
        toast.error(`Error deleting`);
      } else {
        toast.success(`Member deleted successfully`);
      }
    }
    closeModal();
  };

  const handleOpenLeaveModal = (member: memberType) => {
    setCurrentMember(member);
    setOpenLeaveModal(true);
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
      if (error) {
        toast.error(`Error change role from user`);
      } else {
        toast.success(`Change role successfully`);
      }
    }
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
      if (error) {
        toast.error(`User already invited`);
      } else {
        toast.success(`Invite created successfully`);
      }
    }
    handleCloseMenu();
  };

  const handleCompanyAdmins = () => {
    if (company) {
      dispatch(fetchAdmins(company.id));
      navigate(mainUrls.actions.adminsCompany(company.id))
      if (error) {
        toast.error(`Error get admins from company`);
      } else {
        toast.success(`Get admins from company successfully`);
      }
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
          <Typography variant="h6">Company: "{company?.name}"</Typography>
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
                    {currentUser?.id === company?.owner_id &&
                      <Button
                        onClick={() => handleOpenChangeRoleModal(member)}
                        variant="outlined"
                        color="primary"
                        sx={{marginRight: 1}}
                      >
                        Change Role
                      </Button>
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
        style_done={styles.done_leave}
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
        style_done={styles.done_leave}
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
        style_done={styles.done_change_role}
      />
    </>
  );
};

export default CompanyMembersPage;
