import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllDegree } from "../../../_redux/Degree/DegreeCrud";
import { DegreeSlice } from "../../../_redux/Degree/DegreeSlice";
import DegreeTable from "./components/DegreeTable/DegreeTable";

const Degree = () => {
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;

  const { allDegree, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allDegree: state.degree.allDegree,
      filter: state.degree.filter,
      page: state.degree.page,
      dataPerPage: state.degree.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllDegree({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllDegree(res?.data?.data?.degrees_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.degrees_data?.count,
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
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DegreeTable allDegree={allDegree} getAllData={getAllData} />
    </Paper>
  );
};

export default Degree;
