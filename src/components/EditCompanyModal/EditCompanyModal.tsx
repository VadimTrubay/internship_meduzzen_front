import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {style} from "../../utils/BaseModal.styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {StyledBox, Text} from "../../utils/BaseModal.styled";
import {Button, Checkbox, FormControlLabel, TextField} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";


export interface EditCompanyModalType {
  openModal: boolean;
  closeModal: () => void;
  style_close: string;
  color_off: "inherit" | "disabled" | "action" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  style_title: string;
  title: string;
  formikEditCompany: any;
  name: string;
  description: string;
  visible: string;
  style_done: string;
}

const EditCompanyModal: React.FC<EditCompanyModalType> = ({
                                                           openModal,
                                                           closeModal,
                                                           style_close, color_off,
                                                           style_title, title,
                                                           formikEditCompany,
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
          <StyledBox component="form" onSubmit={formikEditCompany.handleSubmit}>
            <Typography variant="h6">
              <Text>{name}</Text>
            </Typography>
            <TextField
              id="name"
              name="name"
              variant="standard"
              color="success"
              value={formikEditCompany.values.name}
              onChange={formikEditCompany.handleChange}
              onBlur={formikEditCompany.handleBlur}
              error={formikEditCompany.touched.name && Boolean(formikEditCompany.errors.name)}
              helperText={formikEditCompany.touched.name && formikEditCompany.errors.name}
            />
            <Typography variant="h6">
              <Text>{description}</Text>
            </Typography>
            <TextField
              id="description"
              name="description"
              variant="standard"
              color="success"
              value={formikEditCompany.values.description}
              onChange={formikEditCompany.handleChange}
              onBlur={formikEditCompany.handleBlur}
              error={formikEditCompany.touched.description && Boolean(formikEditCompany.errors.description)}
              helperText={formikEditCompany.touched.description && formikEditCompany.errors.description}
            />
            <Typography variant="h6">
              <Text>{visible}</Text>
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  id="visible"
                  name="visible"
                  color="success"
                  checked={formikEditCompany.values.visible}
                  onChange={formikEditCompany.handleChange}
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

export default EditCompanyModal;
