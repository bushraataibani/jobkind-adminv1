import React from "react";

import CandidateMgtAddForm from "./CandidateMgtAddForm";

const CandidateMgtAdd = ({ show, onHide }) => {
  const addCandidateMgt = (data) => {};

  return (
    <CandidateMgtAddForm
      show={show}
      onHide={onHide}
      addCandidateMgt={addCandidateMgt}
    />
  );
};

export default CandidateMgtAdd;
