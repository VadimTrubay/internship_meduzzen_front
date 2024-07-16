import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button} from "@mui/material";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import styles from "./HomePage.module.css";
import {selectTestString} from "../../redux/test_string/selectors";
import {updateTestString} from "../../redux/test_string/slice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
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
      <h1>Home</h1>
      <br/>
      <p>Welcome to App</p>
      <br/>
      <br/>
      <br/>
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
