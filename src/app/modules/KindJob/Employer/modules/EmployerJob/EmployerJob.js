import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllEmployerJob } from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerJobView from "./components/EmployerJobView/EmployerJobView";

const EmployerJob = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    empPage,
    empDataPerPage,
    allEmployerJob,
    selectedEmployer,
  } = useSelector(
    (state) => ({
      empPage: state.employer.empPage,
      empDataPerPage: state.employer.empDataPerPage,
      allEmployerJob: state.employer.allEmployerJob,
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getAllJobList = () => {
    dispatch(actions.setLoading(true));
    getAllEmployerJob({
      search: "",
      page_no: empPage,
      page_record: empDataPerPage,
      user_id: selectedEmployer?.id?.data,
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerJob(res?.data?.data?.employer_job_data?.rows)
        );
        dispatch(
          actions.setEmpPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employer_job_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setEmpPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    if (show) {
      getAllJobList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empPage, empDataPerPage, show]);

  return (
    <EmployerJobView
      show={show}
      id={id}
      onHide={onHide}
      allEmployerJob={allEmployerJob}
    />
  );
};

export default EmployerJob;
