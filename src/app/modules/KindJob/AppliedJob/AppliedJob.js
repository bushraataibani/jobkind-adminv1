import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllJobAppyEmployee } from "../_redux/AppliedJob/AppliedJobCrud";
import { AppliedJobSlice } from "../_redux/AppliedJob/AppliedJobSlice";
import AppliedJobTable from "./components/AppliedJobTable/AppliedJobTable";

const AppliedJob = ({ show }) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;

  const { allAppliedJob, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allAppliedJob: state.appliedJob.allAppliedJob,
      filter: state.appliedJob.filter,
      page: state.appliedJob.page,
      dataPerPage: state.appliedJob.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllJobAppyEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllAppliedJob(res?.data?.data?.employee_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
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
    <>
      {show && (
        <Paper
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <AppliedJobTable
            allAppliedJob={allAppliedJob}
            getAllData={getAllData}
          />
        </Paper>
      )}
    </>
  );
};

export default AppliedJob;
