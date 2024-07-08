import React from "react";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <ModalWindow/>
      <h1>Home</h1>
      <p>Welcome to App</p>
      <p>This is my best project</p>
    </div>
  );
};

export default HomePage;
