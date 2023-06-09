import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import DeleteModal from "../../../../Helpers/DeleteModal/DeleteModal";

const CandidateMgtDelete = ({ show, id, onHide }) => {
  const { selectedCandidateMgt } = useSelector(
    (state) => ({
      selectedCandidateMgt: state.candidateMgt.selectedCandidateMgt,
    }),
    shallowEqual
  );

  const deleteCandidateMgt = () => {};

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteCandidateMgt}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Candidate Management"
      selectedData={selectedCandidateMgt && selectedCandidateMgt?.keyword?.data}
    />
  );
};

export default CandidateMgtDelete;
