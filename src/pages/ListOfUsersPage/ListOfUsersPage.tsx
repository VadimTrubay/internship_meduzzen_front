import React from "react";
import styles from "./ListOfUsersPage.module.css";
import UsersList from "../../components/UsersList/UsersList";

const ListOfUsersPage: React.FC = () => {
  return (
    <div className={styles.title}>
      <h2>USERS</h2>
      <UsersList/>
    </div>
  );
};

export default ListOfUsersPage;
