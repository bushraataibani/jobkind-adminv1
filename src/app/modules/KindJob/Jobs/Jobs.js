/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllListEmployee, getAllListJob } from "../_redux/Jobs/JobsCrud";
import { jobsSlice } from "../_redux/Jobs/JobsSlice";
import JobsTable from "./components/JobsTable/JobsTable";
import { getAllJob } from "../_redux/Job/JobCrud";
import { getAllCity } from "../_redux/City/CityCrud";

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
    jobTitle,
    jobStatus,
    city,
  } = useSelector(
    (state) => ({
      allJobs: state.jobs.allJobs,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataPerPage: state.jobs.dataPerPage,
      candidatePage: state.jobs.candidatePage,
      candidateDataPerPage: state.jobs.candidateDataPerPage,
      allCandidate: state.jobs.allCandidate,
      jobTitle: state.jobs.jobTitle,
      jobStatus: state.jobs.jobStatus,
      city: state.jobs.city,
    }),
    shallowEqual
  );

  const [allJobOption, setAllJobOption] = useState([]);
  const [allCityOption, setAllCityOption] = useState([]);
  const [selected, setSelected] = useState([]);

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllListJob({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
      job_title_id: jobTitle?.[0]?.value,
      status: jobStatus?.[0]?.value,
      city_id: city?.[0]?.value,
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
  const getAllJobOptions = () => {
    getAllJob({
      search: "",
      page_no: 0,
      page_record: "",
    })
      .then((res) => {
        setAllJobOption(res?.data?.data?.job_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  const getAllCityOptions = () => {
    getAllCity({
      search: "",
      page_no: 0,
      page_record: "",
    })
      .then((res) => {
        setAllCityOption(res?.data?.data?.city_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllCityOptions();
  }, []);

  useEffect(() => {
    setSelected([]);
    getAllJobOptions();
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage, jobStatus, jobTitle, city]);

  useEffect(() => {
    getAllCandidateData();
  }, [candidatePage, candidateDataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <JobsTable
        allJobs={allJobs}
        getAllData={getAllData}
        allCandidate={allCandidate}
        allJobOption={allJobOption}
        allCityOption={allCityOption}
        selected={selected}
        setSelected={setSelected}
      />
    </Paper>
  );
};

export default Jobs;
