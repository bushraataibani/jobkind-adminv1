/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
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
    candidatePage,
    candidateDataPerPage,
    allCandidate,
  } = useSelector(
    (state) => ({
      allJobs: state.jobs.allJobs,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataPerPage: state.jobs.dataPerPage,
      candidatePage: state.jobs.candidatePage,
      candidateDataPerPage: state.jobs.candidateDataPerPage,
      allCandidate: state.jobs.allCandidate,
    }),
    shallowEqual
  );
  const [selected, setSelected] = useState([]);

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

  const getAllCandidateData = () => {
    dispatch(actions.setLoading(true));
    getAllListEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: candidatePage,
      page_record: candidateDataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllCandidate(res?.data?.data?.employee_data?.rows));
        dispatch(
          actions.setCandidatePageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setCandidatePageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    setSelected([]);
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  useEffect(() => {
    getAllCandidateData();
  }, [candidatePage, candidateDataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <JobsTable
        allJobs={allJobs}
        getAllData={getAllData}
        allCandidate={allCandidate}
        setSelected={setSelected}
        selected={selected}
      />
    </Paper>
  );
};

export default Jobs;
