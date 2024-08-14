import React, {useEffect} from "react";
import {
  Box,
  Grid,
  LinearProgress,
  Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectLoading, selectQuizById} from "../../redux/quizzes/selectors";
import {AppDispatch} from "../../redux/store";
import {useParams} from "react-router-dom";
import {fetchQuizById} from "../../redux/quizzes/operations";


const CompanyQuizPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{ id: string }>();
  const loading = useSelector(selectLoading);
  const quiz = useSelector(selectQuizById);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuizById(id));
    }
  }, []);

  return (
    loading ? (
      <Box>
        <LinearProgress/>
      </Box>
    ) : (
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Company Quiz View
          </Typography>
          <Typography variant="h6">Quiz: "{quiz?.name}"</Typography>
        </Grid>
      </Grid>
    )
  )
};

export default CompanyQuizPage;
