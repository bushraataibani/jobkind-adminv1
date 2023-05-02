/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import {
  getAllAppliedJobList,
  getEmployerJobDetails,
} from "../../../_redux/Employer/EmployerCrud";
import { useEffect } from "react";
import EmployerJobApplyView from "./EmployerJobApplyView";

const EmployerJobApply = ({ show, userId, mainJobId }) => {
  console.log(mainJobId, userId, "mainJobId, userId");
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const { selectedEmployer } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getEmployerApplyJobEmployee = (main_job_id) => {
    dispatch(actions.setLoading(true));
    getAllAppliedJobList({
      search: "",
      page_no: 0,
      page_record: 10,
      main_job_id: parseInt(main_job_id),
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerApplyJob(
            res?.data?.data?.employee_job_list_data?.rows
          )
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  };

  const getEmployerJobDetailsList = (user_id) => {
    dispatch(actions.setLoading(true));
    getEmployerJobDetails(user_id)
      .then((res) => {
        dispatch(actions.setEmployerJobDetails(res?.data?.data?.job_data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  };

  useEffect(() => {
    if (mainJobId) {
      getEmployerApplyJobEmployee(
        selectedEmployer ? selectedEmployer.id.data : parseInt(mainJobId)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainJobId]);

  useEffect(() => {
    if (userId) {
      getEmployerJobDetailsList(
        selectedEmployer ? selectedEmployer.user_id.data : parseInt(userId)
      );
    }
  }, [userId]);

  return (
    show && (
      <div>
        <EmployerJobApplyView
          show={show}
          mainJobId={mainJobId}
          userId={userId}
        />
      </div>
    )
  );
};

export default EmployerJobApply;
