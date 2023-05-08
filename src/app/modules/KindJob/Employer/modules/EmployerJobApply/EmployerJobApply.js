/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getAllAppliedJobList,
  getEmployerJobDetails,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerJobApplyView from "./EmployerJobApplyView";

const EmployerJobApply = ({ show, userId, mainJobId }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    selectedEmployer,
    appliedJobPage,
    appliedJobDataPerPage,
  } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
      appliedJobPage: state.employer.appliedJobPage,
      appliedJobDataPerPage: state.employer.appliedJobDataPerPage,
    }),
    shallowEqual
  );

  const getEmployerApplyJobEmployee = (id) => {
    dispatch(actions.setLoading(true));
    getAllAppliedJobList({
      search: "",
      page_no: appliedJobPage,
      page_record: appliedJobDataPerPage,
      main_job_id: parseInt(id),
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerApplyJob(
            res?.data?.data?.employee_job_list_data?.rows
          )
        );
        dispatch(
          actions.setAppliedJobPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_job_list_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setAppliedJobPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const getEmployerJobDetailsList = (id) => {
    dispatch(actions.setLoading(true));
    getEmployerJobDetails(id)
      .then((res) => {
        dispatch(actions.setEmployerJobDetails(res?.data?.data?.job_data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  };

  useEffect(() => {
    if (userId) {
      getEmployerApplyJobEmployee(
        selectedEmployer ? selectedEmployer.id.data : parseInt(mainJobId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, mainJobId, appliedJobPage, appliedJobDataPerPage]);

  useEffect(() => {
    if (mainJobId) {
      getEmployerJobDetailsList(
        selectedEmployer ? selectedEmployer.id.data : parseInt(mainJobId)
      );
    }
  }, [mainJobId]);

  return (
    show && (
      <div>
        <EmployerJobApplyView
          show={show}
          userId={userId}
          mainJobId={mainJobId}
        />
      </div>
    )
  );
};

export default EmployerJobApply;
