import React, {useEffect, useState} from "react";
import {
  Box, Button, Container, FormControl, FormControlLabel, FormLabel,
  Grid, LinearProgress, Checkbox, Typography, Paper
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
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);


  console.log(quiz)
  useEffect(() => {
    if (id) {
      dispatch(fetchQuizById(id));
    }
  }, [id, dispatch]);

  const handleChange = (questionId, option) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      const newAnswers = currentAnswers.includes(option)
        ? currentAnswers.filter((answer) => answer !== option)
        : [...currentAnswers, option];

      return {
        ...prevAnswers,
        [questionId]: newAnswers,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const quizRequest = {
        answers,
      };
      alert(JSON.stringify(quizRequest, null, 2));
      // const response = await axios.post(`/api/create/${quiz.id}`, quizRequest);
      setSubmitted(true);
      // alert(`Your score: ${response.data.score}`);
    } catch (error) {
      console.error("Error submitting quiz", error);
      alert("Failed to submit quiz.");
    }
  };

  return loading ? (
    <Box>
      <LinearProgress/>
    </Box>
  ) : (
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

        {quiz?.questions?.map((question, index) => (
          <Grid item xs={12} key={index}>
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

        {!submitted && (
          <Grid item xs={12} style={{marginTop: "16px"}} align="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        )}

        {submitted && (
          <Grid item xs={12} style={{marginTop: "16px"}}>
            <Typography variant="h6" color="primary" align="center">
              Quiz submitted successfully!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CompanyQuizPage;
