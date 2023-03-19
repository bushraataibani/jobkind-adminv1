import React from "react";
import UserAddForm from "./UserAddForm";

const UserAdd = ({ show, onHide }) => {
  const addUser = (data) => {};

  return (
    <>
      <UserAddForm onHide={onHide} show={show} addUser={addUser} />
    </>
  );
};

export default UserAdd;
