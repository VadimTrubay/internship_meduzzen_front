import React from "react";
import {Grid, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useSelector} from "react-redux";
import {selectCompanyById} from "../../redux/companies/selectors";
import {FaEye, FaEyeSlash} from "react-icons/fa";

const CompanyProfilePage = () => {
  const company = useSelector(selectCompanyById)
  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            COMPANY PROFILE
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Avatar/>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Name:
          </Typography>
          <Typography color="textSecondary">
            {company?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Description:
          </Typography>
          <Typography color="textSecondary">
            {company?.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Visible:
          </Typography>
          <Typography color="textSecondary">
            {company.visible ? <FaEye /> : <FaEyeSlash />}
          </Typography>
        </Grid>
      </Grid>

    </>
  );
};

export default CompanyProfilePage;
