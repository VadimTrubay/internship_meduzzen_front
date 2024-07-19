import React from "react";
import {Grid, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";

const CompanyProfilePage = ({company}) => {
  console.log(company)
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
            {company.is_admin ? "admin" : "user"}
          </Typography>
        </Grid>
      </Grid>

    </>
  );
};

export default CompanyProfilePage;
