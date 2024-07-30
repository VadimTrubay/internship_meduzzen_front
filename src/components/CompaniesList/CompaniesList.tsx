import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Box, Button, LinearProgress, Modal,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";
import {fetchCompanies, fetchCompanyById} from "../../redux/companies/operations";
import {selectTotalCount} from "../../redux/companies/selectors";
import {selectLoading} from "../../redux/companies/selectors";
import {AppDispatch} from "../../redux/store";
import {CompaniesListProps, CompanyType} from "../../types/companiesTypes";
import Avatar from "@mui/material/Avatar";
import {NavLink} from "react-router-dom";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {selectUser} from "../../redux/auth/selectors";
import {selectError} from "../../redux/actions/selectors";
import styles from "./CompaniesList.module.css";
import {style, StyledBox, Text} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import toast from "react-hot-toast";
import {createRequest, fetchMyRequests} from "../../redux/actions/operations";
import {selectMyRequests} from "../../redux/actions/selectors";
import {mainUrls} from "../../config/urls";

const columns = [
  {id: "avatar", label: "Avatar", minWidth: 50},
  {id: "name", label: "Name", minWidth: 120},
  {id: "description", label: "Description", minWidth: 120},
  {id: "visible", label: "Visible", minWidth: 30},
  {id: "options", label: "Options", minWidth: 50},
];

const CompaniesList: React.FC<CompaniesListProps> = ({companies}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const totalCount: number = useSelector(selectTotalCount);
  const myRequests = useSelector(selectMyRequests);
  const loading = useSelector<boolean>(selectLoading);
  const [openCreateMyRequestModal, setOpenCreateMyRequestModal] = useState<boolean>(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [selectedCompanyOwner, setSelectedCompanyOwner] = useState<string | null>(null);
  const error = useSelector<string>(selectError);
  const [skip, setSkip] = useState<number>(1);
  const limit = 10;

  const countPage = Math.ceil(totalCount / limit);
  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setSkip(page);
  };

  const handleGetCompany = (companyId: string) => {
    if (companyId) {
      dispatch(fetchCompanyById(companyId));
    }
  };

  useEffect(() => {
    dispatch(fetchCompanies({skip, limit}));
  }, [dispatch, skip, myRequests, error]);

  const handleOpenCreateMyRequestModal = (companyId: string, companyOwnerId: string) => {
    setSelectedCompanyOwner(companyOwnerId);
    setSelectedCompanyId(companyId);
    setOpenCreateMyRequestModal(true);
  };

  const handleCloseCreateMyRequestModal = () => {
    setOpenCreateMyRequestModal(false);
    setSelectedCompanyId(null);
  };

  const handleCreateMyRequest = () => {
    if (selectedCompanyId !== null) {
      dispatch(createRequest({userId: selectedCompanyOwner, companyId: selectedCompanyId}));
      dispatch(fetchMyRequests());
      if (error) {
        toast.error(`User already requested`);
      } else {
        toast.success(`Request created successfully`);
      }
    }
    handleCloseCreateMyRequestModal();
  };

  return (
    loading ? (
      <Box>
        <LinearProgress/>
      </Box>
    ) : (
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
              {companies?.filter((company: CompanyType) => company.owner_id === user.id || company.visible)
                .map((company: CompanyType) => (
                  <TableRow key={company.id} className={styles.tableRow}>
                    <TableCell component="th" scope="row" sx={{padding: "3px"}}>
                      <Avatar className={styles.avatar}/>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      <NavLink className={styles.link} to={mainUrls.companies.byId(company.id)}
                               onClick={() => handleGetCompany(company.id)}>
                        {company.name}
                      </NavLink>
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {company.description}
                    </TableCell>
                    <TableCell sx={{padding: "3px"}} align="center">
                      {company.visible ? <FaEye/> : <FaEyeSlash/>}
                    </TableCell>
                    <TableCell align="center">
                      {user?.id !== company?.owner_id &&
                        <Button
                          onClick={() => handleOpenCreateMyRequestModal(company.id, company?.owner_id)}
                          variant="outlined"
                          color="success"
                          sx={{marginRight: 1}}
                        >
                          Create Request
                        </Button>
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{display: "flex", justifyContent: "center", marginTop: 4}}>
          <Pagination
            count={countPage}
            page={skip}
            onChange={handleChangePage}
            color={"primary"}
          />
        </Box>
        {/* Create My Request Modal */}
        <Modal
          open={openCreateMyRequestModal}
          onClose={handleCloseCreateMyRequestModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className={styles.close}>
              <HighlightOffIcon onClick={handleCloseCreateMyRequestModal} color={"success"}/>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Text className={styles.title_accept}>Create Request</Text>
              <Text>Are you sure you want to create this request?</Text>
            </Typography>
            <StyledBox>
              <Button onClick={handleCreateMyRequest} type="button">
                <DoneIcon sx={{fontSize: 40, color: "green"}}/>
              </Button>
            </StyledBox>
          </Box>
        </Modal>
      </Paper>
    )
  );
};

export default CompaniesList;
