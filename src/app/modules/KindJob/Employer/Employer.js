import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllEmployer } from "../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../_redux/Employer/EmployerSlice";
import EmployerTable from "./components/EmployerTable/EmployerTable";
import EmployerJob from "./modules/EmployerJob/EmployerJob";
import EmployerJobApply from "./modules/EmployerJob/EmployerJobApply";

const Employer = () => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const {
    allEmployer,
    filter,
    page,
    dataPerPage,
    showEmployerJobList,
    showEmployerJobDetailsList,
  } = useSelector(
    (state) => ({
      allEmployer: state.employer.allEmployer,
      filter: state.employer.filter,
      page: state.employer.page,
      dataPerPage: state.employer.dataPerPage,
      showEmployerJobList: state.employer.showEmployerJobList,
      showEmployerJobDetailsList: state.employer.showEmployerJobDetailsList,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllEmployer({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllEmployer(res?.data?.data?.employer_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employer_data?.count,
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
      {showEmployerJobList ? (
        <EmployerJob />
      ) : showEmployerJobDetailsList ? (
        <EmployerJobApply />
      ) : (
        <Paper
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <EmployerTable allEmployer={allEmployer} getAllData={getAllData} />
        </Paper>
      )}
    </>
  );
};

export default Employer;
