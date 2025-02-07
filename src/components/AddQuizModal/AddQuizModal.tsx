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
import {AddQuizModalType} from "../../types/quizzesTypes";
import toast from "react-hot-toast";

const AddQuizModal: React.FC<AddQuizModalType> = ({
  openModal,
  closeModal,
  style_close,
  color_off,
  style_title,
  formikAddQuiz,
  title,
  title_name,
  title_description,
  title_frequency_days,
  title_questions,
  title_answer_options,
}) => {

  const validateAnswers = () => {
    const questions = formikAddQuiz.values.questions;
    for (const question of questions) {
      const answerOptions = question.answer_options;

      const optionCount = answerOptions.reduce((acc, option) => {
        acc[option] = (acc[option] || 0) + 1;
        return acc;
      }, {});

      const duplicates = Object.values(optionCount).some(count => count >= 2);

      if (duplicates) {
        return `Все варианты ответа должны быть уникальными. Пожалуйста, измените дублирующиеся ответы.`;
      }
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateAnswers();
    if (validationError) {
      toast.error(validationError);
    } else {
      formikAddQuiz.handleSubmit();
    }
  };

  const pushQuestion = () => {
    formikAddQuiz.setFieldValue("questions", [
      ...formikAddQuiz.values.questions,
      {question_text: "", correct_answer: [""], answer_options: ["", ""]}
    ]);
  };

  const removeQuestion = (questionIndex: number) => {
    if (formikAddQuiz.values.questions.length > 2) {
      const questions = [...formikAddQuiz.values.questions];
      questions.splice(questionIndex, 1);
      formikAddQuiz.setFieldValue("questions", questions);
    }
  };

  const pushOption = (questionIndex: number) => {
    const questions = [...formikAddQuiz.values.questions];
    questions[questionIndex].answer_options.push("");
    formikAddQuiz.setFieldValue("questions", questions);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    if (formikAddQuiz.values.questions[questionIndex].answer_options.length > 2) {
      const questions = [...formikAddQuiz.values.questions];
      const optionValue = questions[questionIndex].answer_options[optionIndex];
      questions[questionIndex].answer_options.splice(optionIndex, 1);
      const correctAnswerIndex = questions[questionIndex].correct_answer.indexOf(optionValue);
      if (correctAnswerIndex > -1) {
        questions[questionIndex].correct_answer.splice(correctAnswerIndex, 1);
      }
      formikAddQuiz.setFieldValue("questions", questions);
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
    const questions = [...formikAddQuiz.values.questions];
    const optionValue = questions[questionIndex].answer_options[optionIndex];

    questions[questionIndex].correct_answer = questions[questionIndex].answer_options.filter((option, idx) => {
      return idx === optionIndex
        ? !questions[questionIndex].correct_answer.includes(optionValue)
        : questions[questionIndex].correct_answer.includes(option);
    });

    formikAddQuiz.setFieldValue("questions", questions);
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
        <MuiBox component="form" onSubmit={handleSubmit} sx={{width: "100%"}}>
          <Typography variant="h5" sx={{display: "flex", justifyContent: "left", marginTop: 2}}>
            {title_name}
          </Typography>
          <TextField
            data-testid="quiz-name"
            id="name"
            name="name"
            variant="outlined"
            color="primary"
            fullWidth
            value={formikAddQuiz.values.name}
            onChange={formikAddQuiz.handleChange}
            onBlur={formikAddQuiz.handleBlur}
            error={formikAddQuiz.touched.name && Boolean(formikAddQuiz.errors.name)}
            helperText={formikAddQuiz.touched.name && typeof formikAddQuiz.errors.name === 'string' ? formikAddQuiz.errors.name : ""}
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
            value={formikAddQuiz.values.description}
            onChange={formikAddQuiz.handleChange}
            onBlur={formikAddQuiz.handleBlur}
            error={formikAddQuiz.touched.description && Boolean(formikAddQuiz.errors.description)}
            helperText={formikAddQuiz.touched.description && typeof formikAddQuiz.errors.description === 'string' ? formikAddQuiz.errors.description : ""}
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
            value={formikAddQuiz.values.frequency_days}
            onChange={formikAddQuiz.handleChange}
            onBlur={formikAddQuiz.handleBlur}
            error={formikAddQuiz.touched.frequency_days && Boolean(formikAddQuiz.errors.frequency_days)}
            helperText={formikAddQuiz.touched.frequency_days && typeof formikAddQuiz.errors.frequency_days === 'string' ? formikAddQuiz.errors.frequency_days : ""}
          />
          <Typography variant="h5" sx={{display: "flex", justifyContent: "center", marginTop: 2}}>
            {title_questions}
          </Typography>

          {formikAddQuiz.values.questions.map((question, questionIndex) => (
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
                    value={formikAddQuiz.values.questions[questionIndex].question_text}
                    onChange={formikAddQuiz.handleChange}
                    onBlur={formikAddQuiz.handleBlur}
                    error={formikAddQuiz.touched.questions?.[questionIndex]?.question_text && Boolean(formikAddQuiz.errors.questions?.[questionIndex]?.question_text)}
                    helperText={formikAddQuiz.touched.questions?.[questionIndex]?.question_text && typeof formikAddQuiz.errors.questions?.[questionIndex]?.question_text === 'string' ? formikAddQuiz.errors.questions?.[questionIndex]?.question_text : ""}
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
                      value={formikAddQuiz.values.questions[questionIndex].answer_options[optionIndex]}
                      onChange={formikAddQuiz.handleChange}
                      onBlur={formikAddQuiz.handleBlur}
                      error={formikAddQuiz.touched.questions?.[questionIndex]?.answer_options?.[optionIndex] && Boolean(formikAddQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex])}
                      helperText={formikAddQuiz.touched.questions?.[questionIndex]?.answer_options?.[optionIndex] && typeof formikAddQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex] === 'string' ? formikAddQuiz.errors.questions?.[questionIndex]?.answer_options?.[optionIndex] : ""}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formikAddQuiz.values.questions[questionIndex].correct_answer.includes(option)}
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

export default AddQuizModal;
