import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllEmployerJob } from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerJobView from "./components/EmployerJobView/EmployerJobView";

const EmployerJob = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    filter,
    page,
    dataPerPage,
    allEmployerJob,
    selectedEmployer,
  } = useSelector(
    (state) => ({
      filter: state.employer.filter,
      page: state.employer.page,
      dataPerPage: state.employer.dataPerPage,
      allEmployerJob: state.employer.allEmployerJob,
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getAllJobList = () => {
    dispatch(actions.setLoading(true));
    getAllEmployerJob({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
      user_id: selectedEmployer?.id?.data,
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerJob(res?.data?.data?.employer_job_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employer_job_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
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
  }, [page, dataPerPage, show]);

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
