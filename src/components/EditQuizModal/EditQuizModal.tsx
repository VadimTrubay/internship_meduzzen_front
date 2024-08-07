import React from "react";
import {
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  Box as MuiBox,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {StyledBox, styleQuizModal} from "../../utils/BaseModal.styled";
import Paper from "@mui/material/Paper";
import {EditQuizModalType} from "../../types/quizzesTypes";

const EditQuizModal: React.FC<EditQuizModalType> = ({
                                                      openModal,
                                                      closeModal,
                                                      style_close,
                                                      color_off,
                                                      style_title,
                                                      formikEditQuiz,
                                                      title,
                                                      title_name,
                                                      title_description,
                                                      title_frequency_days,
                                                      title_questions,
                                                      title_answer_options,
                                                    }) => {
  const pushQuestion = () => {
    const questions = [...formikEditQuiz.values.questions];
    questions.push({
      question_text: "",
      correct_answer: [""],
      answer_options: ["", ""]
    });
    formikEditQuiz.setFieldValue("questions", questions);
  };

  const removeQuestion = (questionIndex: number) => {
    if (formikEditQuiz.values.questions.length > 2) {
      const questions = [...formikEditQuiz.values.questions];
      questions.splice(questionIndex, 1);
      formikEditQuiz.setFieldValue("questions", questions);
    }
  };

  const pushOption = (questionIndex: number) => {
    const questions = [...formikEditQuiz.values.questions];
    const updatedQuestion = {...questions[questionIndex]};
    updatedQuestion.answer_options = [...updatedQuestion.answer_options, ""];

    questions[questionIndex] = updatedQuestion;
    formikEditQuiz.setFieldValue("questions", questions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (formikEditQuiz.values.questions[questionIndex].answer_options.length > 2) {
      const questions = [...formikEditQuiz.values.questions];
      const updatedQuestion = {...questions[questionIndex]};
      updatedQuestion.answer_options = [...updatedQuestion.answer_options];

      const optionValue = updatedQuestion.answer_options[optionIndex];
      updatedQuestion.answer_options.splice(optionIndex, 1);

      updatedQuestion.correct_answer = [...updatedQuestion.correct_answer];
      const correctAnswerIndex = updatedQuestion.correct_answer.indexOf(optionValue);
      if (correctAnswerIndex > -1) {
        updatedQuestion.correct_answer.splice(correctAnswerIndex, 1);
      }

      questions[questionIndex] = updatedQuestion;
      formikEditQuiz.setFieldValue("questions", questions);
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
    const questions = [...formikEditQuiz.values.questions];
    const updatedQuestion = {...questions[questionIndex]};
    updatedQuestion.correct_answer = [...updatedQuestion.correct_answer];

    const optionValue = updatedQuestion.answer_options[optionIndex];
    const correctAnswerIndex = updatedQuestion.correct_answer.indexOf(optionValue);

    if (correctAnswerIndex > -1) {
      updatedQuestion.correct_answer.splice(correctAnswerIndex, 1);
    } else {
      updatedQuestion.correct_answer.push(optionValue);
    }

    questions[questionIndex] = updatedQuestion;
    formikEditQuiz.setFieldValue("questions", questions);
  };

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox sx={styleQuizModal}>
        <MuiBox className={style_close} sx={{display: "flex", justifyContent: "flex-end", width: "100%"}}>
          <HighlightOffIcon onClick={closeModal} color={color_off}/>
        </MuiBox>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{textAlign: "center", width: "100%"}}>
          <div className={style_title}>{title}</div>
        </Typography>
        <MuiBox component="form" onSubmit={formikEditQuiz.handleSubmit} sx={{width: "100%"}}>
          <Typography variant="h5" sx={{display: "flex", justifyContent: "left", marginTop: 2}}>
            {title_name}
          </Typography>
          <TextField
            id="name"
            name="name"
            variant="outlined"
            color="primary"
            fullWidth
            value={formikEditQuiz.values.name}
            onChange={formikEditQuiz.handleChange}
            onBlur={formikEditQuiz.handleBlur}
            error={formikEditQuiz.touched.name && Boolean(formikEditQuiz.errors.name)}
            helperText={formikEditQuiz.touched.name && typeof formikEditQuiz.errors.name === 'string' ? formikEditQuiz.errors.name : ""}
          />
          <Typography variant="h5" sx={{display: "flex", justifyContent: "left", marginTop: 2}}>
            {title_description}
          </Typography>
          <TextField
            id="description"
            name="description"
            variant="outlined"
            color="primary"
            fullWidth
            value={formikEditQuiz.values.description}
            onChange={formikEditQuiz.handleChange}
            onBlur={formikEditQuiz.handleBlur}
            error={formikEditQuiz.touched.description && Boolean(formikEditQuiz.errors.description)}
            helperText={formikEditQuiz.touched.description && typeof formikEditQuiz.errors.description === 'string' ? formikEditQuiz.errors.description : ""}
          />
          <Typography variant="h5" sx={{display: "flex", justifyContent: "left", marginTop: 2}}>
            {title_frequency_days}
          </Typography>
          <TextField
            id="frequency_days"
            name="frequency_days"
            type="number"
            variant="outlined"
            color="primary"
            value={formikEditQuiz.values.frequency_days}
            onChange={formikEditQuiz.handleChange}
            onBlur={formikEditQuiz.handleBlur}
            error={formikEditQuiz.touched.frequency_days && Boolean(formikEditQuiz.errors.frequency_days)}
            helperText={formikEditQuiz.touched.frequency_days && typeof formikEditQuiz.errors.frequency_days === 'string' ? formikEditQuiz.errors.frequency_days : ""}
          />
          <Typography variant="h5" sx={{display: "flex", justifyContent: "center", marginTop: 2}}>
            {title_questions}
          </Typography>

          {formikEditQuiz.values.questions.map((question, questionIndex) => (
            <MuiBox key={questionIndex} mb={2}>
              <Paper elevation={22} style={{padding: "16px"}}>
                <MuiBox display="flex" alignItems="center">
                  <TextField
                    id={`questions[${questionIndex}].question_text`}
                    name={`questions[${questionIndex}].question_text`}
                    variant="outlined"
                    color="primary"
                    label={`Question ${questionIndex + 1}`}
                    fullWidth
                    value={formikEditQuiz.values.questions[questionIndex].question_text}
                    onChange={formikEditQuiz.handleChange}
                    onBlur={formikEditQuiz.handleBlur}
                    error={formikEditQuiz.touched.questions?.[questionIndex]?.question_text && Boolean(formikEditQuiz.errors.questions?.[questionIndex]?.question_text)}
                    helperText={formikEditQuiz.touched.questions?.[questionIndex]?.question_text && typeof formikEditQuiz.errors.questions?.[questionIndex]?.question_text === 'string' ? formikEditQuiz.errors.questions?.[questionIndex]?.question_text : ""}
                  />
                  {questionIndex >= 2 && (
                    <IconButton onClick={() => removeQuestion(questionIndex)} color="primary">
                      <DeleteIcon/>
                    </IconButton>
                  )}
                </MuiBox>
                <IconButton onClick={pushQuestion} color="primary">
                  <AddCircleOutlineIcon/>
                </IconButton>
                <Typography variant="h5">
                  <div>{title_answer_options}</div>
                </Typography>
                {question.answer_options.map((option, optionIndex) => (
                  <MuiBox key={optionIndex} display="flex" alignItems="center">
                    <TextField
                      id={`questions[${questionIndex}].answer_options[${optionIndex}]`}
                      name={`questions[${questionIndex}].answer_options[${optionIndex}]`}
                      variant="outlined"
                      color="primary"
                      sx={{marginTop: 1}}
                      label={`Option ${optionIndex + 1}`}
                      fullWidth
                      value={formikEditQuiz.values.questions[questionIndex].answer_options[optionIndex]}
                      onChange={formikEditQuiz.handleChange}
                      onBlur={formikEditQuiz.handleBlur}
                      error={formikEditQuiz.touched.questions?.[questionIndex]?.answer_options?.[optionIndex] && Boolean(formikEditQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex])}
                      helperText={formikEditQuiz.touched.questions?.[questionIndex]?.answer_options?.[optionIndex] && typeof formikEditQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex] === 'string' ? formikEditQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex] : ""}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formikEditQuiz.values.questions[questionIndex].correct_answer.includes(option)}
                          onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                          color="primary"
                          sx={{marginLeft: 1}}
                        />
                      }
                      label=""
                    />
                    {optionIndex >= 2 && (
                      <IconButton onClick={() => removeOption(questionIndex, optionIndex)} color="primary">
                        <DeleteIcon/>
                      </IconButton>
                    )}
                  </MuiBox>
                ))}
                <IconButton onClick={() => pushOption(questionIndex)} color="primary">
                  <AddCircleOutlineIcon/>
                </IconButton>
              </Paper>
            </MuiBox>
          ))}
          <MuiBox sx={{display: "flex", justifyContent: "center", width: "100%"}}>
            <Button type="submit">
              <DoneIcon sx={{color: "primary", fontSize: 50}}/>
            </Button>
          </MuiBox>
        </MuiBox>
      </StyledBox>
    </Modal>
  );
};

export default EditQuizModal;
