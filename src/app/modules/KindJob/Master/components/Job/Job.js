/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllDepartment } from "../../../_redux/Department/DepartmentCrud";
import { DepartmentSlice } from "../../../_redux/Department/DepartmentSlice";
import { getAllJob } from "../../../_redux/Job/JobCrud";
import { JobSlice } from "../../../_redux/Job/JobSlice";
import JobTable from "./components/JobTable/JobTable";

const Job = () => {
  const dispatch = useDispatch();
  const { actions } = JobSlice;
  const { actions: AcDept } = DepartmentSlice;

  const { allJob, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allJob: state.job.allJob,
      filter: state.job.filter,
      page: state.job.page,
      dataPerPage: state.job.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllJob({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllJob(res?.data?.data?.job_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.job_data?.count,
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
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  const getAllDepartmentList = () => {
    getAllDepartment({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(
          AcDept.setAllDepartment(res?.data?.data?.department_data?.rows)
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllDepartmentList();
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <JobTable allJob={allJob} getAllData={getAllData} />
    </Paper>
  );
};

export default Job;
