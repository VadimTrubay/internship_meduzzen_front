import React, {useEffect} from "react";
import {Grid, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {memberType} from "../../types/actionsTypes";
import {selectMembers} from "../../redux/actions/selectors";



const CompanyMembersPage: React.FC = () => {
  const members = useSelector<memberType[]>(selectMembers);
  console.log(members)

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
