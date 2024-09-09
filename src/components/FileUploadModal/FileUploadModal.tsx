import React from "react";
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";

interface FileUploadModalProps {
  openModal: boolean;
  closeModal: () => void;
  onSubmit: (file: File) => void;
}

const FileUploadModal: React.FC<FileUploadModalProps> = ({openModal, closeModal, onSubmit}) => {
  const formik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values) => {
      if (values.file) {
        onSubmit(values.file);
      }
      closeModal();
    },
  });

  return (
    <Dialog open={openModal} onClose={closeModal}>
      <DialogTitle>Upload Excel File</DialogTitle>
      <DialogContent>
        <input
          id="file"
          name="file"
          type="file"
          accept=".xlsx, .xls"
          onChange={(event) => {
            if (event.target.files) {
              formik.setFieldValue("file", event.target.files[0]);
            }
          }}
        />
        {formik.errors.file && formik.touched.file ? (
          <div>{formik.errors.file}</div>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">Cancel</Button>
        <Button onClick={formik.submitForm} color="primary">Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadModal;
