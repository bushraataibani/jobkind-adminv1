import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import CandidateMgtViewForm from "./CandidateMgtViewForm";

const CandidateMgtView = ({ show, id, onHide }) => {
  const { selectedCandidateMgt } = useSelector(
    (state) => ({
      selectedCandidateMgt: state.candidateMgt.selectedCandidateMgt,
      filter: state.candidateMgt.filter,
      page: state.candidateMgt.page,
      dataPerPage: state.candidateMgt.dataPerPage,
    }),
    shallowEqual
  );

  const saveCandidateMgt = (data) => {};

  return (
    <>
      {selectedCandidateMgt && show && (
        <CandidateMgtViewForm
          show={show}
          onHide={onHide}
          saveCandidateMgt={saveCandidateMgt}
          selectedCandidateMgt={selectedCandidateMgt}
        />
      )}
    </>
  );
};

export default CandidateMgtView;
