import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllListEmployee, getAllListJob } from "../_redux/Jobs/JobsCrud";
import { jobsSlice } from "../_redux/Jobs/JobsSlice";
import JobsTable from "./components/JobsTable/JobsTable";

const Jobs = () => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;

  const {
    allJobs,
    filter,
    page,
    dataPerPage,
    empPage,
    empDataPerPage,
    allEmployee,
  } = useSelector(
    (state) => ({
      allJobs: state.jobs.allJobs,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataPerPage: state.jobs.dataPerPage,
      empPage: state.jobs.empPage,
      empDataPerPage: state.jobs.empDataPerPage,
      allEmployee: state.jobs.allEmployee,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllListJob({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllJobs(res?.data?.data?.mainJobData?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.mainJobData?.count,
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

  const getAllEmployeeData = () => {
    dispatch(actions.setLoading(true));
    getAllListEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: empPage,
      page_record: empDataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllEmployee(res?.data?.data?.employee_data?.rows));
        dispatch(
          actions.setEmpPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
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
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  useEffect(() => {
    getAllEmployeeData();
  }, [empPage, empDataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <JobsTable
        allJobs={allJobs}
        getAllData={getAllData}
        allEmployee={allEmployee}
      />
    </Paper>
  );
};

export default Jobs;
