import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllAppliedJobList } from "../../../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../../../_redux/Employer/EmployerSlice";
import EmployerJobApplyViewModal from "./EmployerJobApplyViewModal";

const EmployerJobApplyEmployeeView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    empJobPage,
    empJobDataPerPage,
    allEmployerApplyJob,
    selectedEmployer,
  } = useSelector(
    (state) => ({
      empJobPage: state.employer.empJobPage,
      empJobDataPerPage: state.employer.empJobDataPerPage,
      allEmployerApplyJob: state.employer.allEmployerApplyJob,
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getEmployerApplyJobEmployee = () => {
    dispatch(actions.setLoading(true));
    getAllAppliedJobList({
      search: "",
      page_no: empJobPage,
      page_record: empJobDataPerPage,
      main_job_id: selectedEmployer?.id?.data,
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerApplyJob(
            res?.data?.data?.employee_job_list_data?.rows
          )
        );
        dispatch(
          actions.setEmpJobPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_job_list_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setEmpJobPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    if (show) {
      getEmployerApplyJobEmployee();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empJobPage, empJobDataPerPage, show]);

  return (
    <EmployerJobApplyViewModal
      show={show}
      id={id}
      onHide={onHide}
      allEmployerApplyJob={allEmployerApplyJob}
    />
  );
};

export default EmployerJobApplyEmployeeView;
