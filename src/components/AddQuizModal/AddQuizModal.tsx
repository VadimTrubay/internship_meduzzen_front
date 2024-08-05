import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {style} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {StyledBox, Text} from "../../utils/BaseModal.styled";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";


export interface AddQuizModalType {
  openModal: boolean;
  closeModal: () => void;
  style_close: string;
  color_off: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  style_title: string;
  title: string;
  formikAddQuiz: any;
  name: string;
  description: string;
  visible: string;
  style_done: string;
}

const AddQuizModal: React.FC<AddQuizModalType> = ({
                                                           openModal,
                                                           closeModal,
                                                           style_close, color_off,
                                                           style_title, title,
                                                           formikAddQuiz,
                                                           name, description,
                                                           visible, style_done
                                                         }) => {
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={style_close}>
            <HighlightOffIcon onClick={closeModal} color={color_off}/>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Text className={style_title}>{title}</Text>
          </Typography>
          <StyledBox component="form" onSubmit={formikAddQuiz.handleSubmit}>
            <Typography variant="h6">
              <Text>{name}</Text>
            </Typography>
            <TextField
              id="name"
              name="name"
              variant="standard"
              color="primary"
              value={formikAddQuiz.values.name}
              onChange={formikAddQuiz.handleChange}
              onBlur={formikAddQuiz.handleBlur}
              error={formikAddQuiz.touched.name && Boolean(formikAddQuiz.errors.name)}
              helperText={formikAddQuiz.touched.name && formikAddQuiz.errors.name}
            />
            <Typography variant="h6">
              <Text>{description}</Text>
            </Typography>
            <TextField
              id="description"
              name="description"
              variant="standard"
              color="primary"
              value={formikAddQuiz.values.description}
              onChange={formikAddQuiz.handleChange}
              onBlur={formikAddQuiz.handleBlur}
              error={formikAddQuiz.touched.description && Boolean(formikAddQuiz.errors.description)}
              helperText={formikAddQuiz.touched.description && formikAddQuiz.errors.description}
            />
            <Typography variant="h6">
              <Text>{visible}</Text>
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  id="visible"
                  name="visible"
                  color="primary"
                  checked={formikAddQuiz.values.visible}
                  onChange={formikAddQuiz.handleChange}
                />
              }
              label="Visible"
            />
            <Button type="submit">
              <DoneIcon className={style_done}/>
            </Button>
          </StyledBox>
        </Box>
      </Modal>
    </>
  );
};

export default AddQuizModal;
