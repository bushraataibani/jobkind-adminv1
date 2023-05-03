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
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const { selectedEmployer } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getEmployerApplyJobEmployee = (id) => {
    dispatch(actions.setLoading(true));
    getAllAppliedJobList({
      search: "",
      page_no: 0,
      page_record: 10,
      main_job_id: parseInt(id),
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
  }, [userId]);

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
