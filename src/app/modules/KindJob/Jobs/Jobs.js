import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllListJob } from "../_redux/Jobs/JobsCrud";
import JobsTable from "./components/JobsTable/JobsTable";
import { jobsSlice } from "../_redux/Jobs/JobsSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;

  const { allJobs, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allJobs: state.jobs.allJobs,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataPerPage: state.jobs.dataPerPage,
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

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <JobsTable allJobs={allJobs} getAllData={getAllData} />
    </Paper>
  );
};

export default Jobs;
