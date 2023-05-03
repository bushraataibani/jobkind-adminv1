import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllEmployeeApplyJobs } from "../../../_redux/AppliedJob/AppliedJobCrud";
import { AppliedJobSlice } from "../../../_redux/AppliedJob/AppliedJobSlice";
import AppliedJobProfileView from "./AppliedJobProfileView";

const AppliedJobProfile = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;

  const { allEmployeeAppliedJob, selectedAppliedJob } = useSelector(
    (state) => ({
      allEmployeeAppliedJob: state.appliedJob.allEmployeeAppliedJob,
      selectedAppliedJob: state.appliedJob.selectedAppliedJob,
    }),
    shallowEqual
  );
  const getAllEmployeeAppliedJobs = (user_id) => {
    if (user_id) {
      dispatch(actions.setLoading(true));
      getAllEmployeeApplyJobs({
        search: "",
        page_no: 0,
        page_record: 10,
        user_id: user_id,
      })
        .then((res) => {
          dispatch(
            actions.setAllEmployeeAppliedJob(
              res?.data?.data?.employee_job_data?.rows
            )
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.employee_job_data?.count,
            })
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  console.log(allEmployeeAppliedJob, "allEmployeeAppliedJob");

  useEffect(() => {
    if (id) {
      getAllEmployeeAppliedJobs(
        selectedAppliedJob ? selectedAppliedJob.id.data : id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    show && (
      <AppliedJobProfileView
        show={show}
        onHide={onHide}
        allEmployeeAppliedJob={allEmployeeAppliedJob}
      />
    )
  );
};

export default AppliedJobProfile;
