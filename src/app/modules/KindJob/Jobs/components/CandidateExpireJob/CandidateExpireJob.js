import React from "react";
import DeleteModal from "../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { useDispatch } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { expireCandidateJobFromServer } from "../../../_redux/Jobs/JobsCrud";

const CandidateExpireJob = ({
  showExpireJobModal,
  setShowExpireJobModal,
  expireJobDetail,
  setExpireJobDetail,
  getAllData,
}) => {
  const dispatch = useDispatch();
  const { actions: generalActions } = generalSlice;

  const expireCandidateJob = () => {
    return expireCandidateJobFromServer({
      main_job_id: expireJobDetail?.id?.data,
    })
      .then((res) => {
        dispatch(
          generalActions.pushNewAlert({
            show: true,
            heading: "Success",
            message: successMessage("Expired", "job"),
            type: "success",
          })
        );

        getAllData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <DeleteModal
      show={showExpireJobModal}
      cancelHandler={() => setShowExpireJobModal(false)}
      deleteHandler={expireCandidateJob}
      deleteButtonLabelWhenSubmitting="Expiring"
      title="Expire Job"
      customMessage={`Are you sure you wan to expire ${expireJobDetail &&
        expireJobDetail?.job_title?.data} job?`}
      deleteButtonLabel={"Expire"}
    />
  );
};

export default CandidateExpireJob;
