import React, {useEffect} from "react";
import {Grid, Typography} from "@mui/material";



const CompanyMembersPage: React.FC = () => {

  useEffect(() => {

  }, []);

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            COMPANY MEMBERS
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CompanyMembersPage;
