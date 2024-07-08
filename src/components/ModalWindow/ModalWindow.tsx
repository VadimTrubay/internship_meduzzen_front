import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import style from "./ModalWindow.module.css";
import {testStringTypes} from "../../types/testStringTypes";


const BasicModal: React.FC<testStringTypes> = ({testString, openModal, handleCloseModal}) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.box}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {testString}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
