import React from "react";
import styles from "./AboutPage.module.css";

const AboutPage: React.FC = () => {
  return (
    <div className={styles.title}>
      <h2>About</h2>
      <p>Meduzzen
        Outstaff and outsourcing agency, IT recruiting. Python (Django, FastAPI, Flask),</p>
      <p>
        JavaScript (React, Vue, Angular), AWS.
      </p>
    </div>
  );
};

export default AboutPage;
