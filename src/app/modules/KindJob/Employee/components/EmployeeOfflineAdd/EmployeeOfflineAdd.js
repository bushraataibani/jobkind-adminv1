import React from "react";
import EmployeeOfflineAddForm from "./EmployeeOfflineAddForm";

const EmployeeOfflineAdd = ({ show, onHide }) => {
  const addCandidateMgt = (data) => {};

  return (
    <EmployeeOfflineAddForm
      show={show}
      onHide={onHide}
      addCandidateMgt={addCandidateMgt}
    />
  );
};

export default EmployeeOfflineAdd;
