import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button, Grid, Typography} from "@mui/material";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import styles from "./HomePage.module.css";
import {selectTestString} from "../../redux/test_string/selectors";
import {updateTestString} from "../../redux/test_string/slice";
import {AppDispatch} from "../../redux/store";


const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const testString = useSelector(selectTestString);
  const [openModal, setOpenModal] = useState(false);


  const handleChange = () => {
    dispatch(updateTestString("Goodbye, MEDUZZEN!"));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    dispatch(updateTestString("Hello, MEDUZZEN!"));
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
      setOpenModal(true);
    }
  }, [openModal]);

  return (
    <div className={styles.container}>
      <ModalWindow testString={testString} openModal={openModal} handleCloseModal={handleCloseModal}/>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Home
        </Typography>
      </Grid>
      <br/>
      <h2>{testString}</h2>
      <br/>
      <Button className={styles.button} variant="contained" onClick={handleChange}>
        Goodbye
      </Button>
    </div>
  );
};

export default HomePage;
