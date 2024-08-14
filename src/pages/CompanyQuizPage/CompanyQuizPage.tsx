import React, {useEffect, useState} from "react";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Checkbox,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  LinearProgress
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectQuizById} from "../../redux/quizzes/selectors";
import {AppDispatch} from "../../redux/store";
import {useNavigate, useParams} from "react-router-dom";
import {fetchQuizById} from "../../redux/quizzes/operations";
import {sendResults} from "../../redux/results/operations";
import {resultsResponseType} from "../../types/resultsTypes";
import {selectQuizResults} from "../../redux/results/selectors";
import {mainUrls} from "../../config/urls";
import {selectCompanyById} from "../../redux/companies/selectors";
import {CompanyType} from "../../types/companiesTypes";
import {selectLoading} from "../../redux/results/selectors";

const CompanyQuizPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const quiz = useSelector(selectQuizById);
  const result = useSelector(selectQuizResults) as resultsResponseType;
  const company = useSelector(selectCompanyById) as CompanyType;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const loading = useSelector<boolean>(selectLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchQuizById(id));
    }
  }, [dispatch, id]);


  const handleChange = (questionId: string, option: string) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((answer: string) => answer !== option)
        : [...currentAnswers, option];

      return {
        ...prevAnswers,
        [questionId]: newAnswers,
      };
    });
  };

  const allQuestionsAnswered = quiz?.questions?.every(
    (question: string) => answers[question.id]?.length > 0
  );

  const handleSubmit = async () => {
    if (Object.keys(answers).length > 0 && allQuestionsAnswered) {
      dispatch(sendResults({quiz_id: id, data: {answers}}));
      setSubmitted(true);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    navigate(mainUrls.quizzes.companyQuizzes(company.id));
    setOpenDialog(false);
  };

  return (
    loading ? (
      <Box>
        <LinearProgress/>
      </Box>
    ) : (
      <>
        <Container maxWidth="sm">
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Company Quiz View
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Quiz: "{quiz?.name}"
              </Typography>
            </Grid>

            {quiz?.questions?.map((question) => (
              <Grid item xs={12} key={question.id}>
                <Paper elevation={3} style={{padding: "16px"}}>
                  <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" style={{marginBottom: "8px"}}>
                      {question.question_text}
                    </FormLabel>
                    {question.answer_options.map((option, i) => (
                      <FormControlLabel
                        key={i}
                        control={
                          <Checkbox
                            checked={
                              answers[question.id]?.includes(option) || false
                            }
                            onChange={() => handleChange(question.id, option)}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </FormControl>
                </Paper>
              </Grid>
            ))}

            <Grid item xs={6}>
              <Box position="sticky" bottom={0} textAlign="center" py={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={!allQuestionsAnswered || submitted}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Dialog sx={{fontSize: "large"}} open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Quiz Result</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{fontSize: "large"}}>
                Your result was {result?.score * 100}%.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </>
    )
  );
};

export default CompanyQuizPage;
