import React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
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
          {/*<Typography id="modal-modal-description" sx={{mt: 2}}>*/}
          {/*</Typography>*/}
          {/*<Button className={styles.button} onClick={handleCloseModal} variant="contained">*/}
          {/*  Close*/}
          {/*</Button>*/}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
