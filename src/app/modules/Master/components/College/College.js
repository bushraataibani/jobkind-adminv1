import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCollege } from "../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../_redux/College/CollegeSlice";
import CollegeTable from "./components/CollegeTable/CollegeTable";

const College = () => {
  const dispatch = useDispatch();
  const { actions } = CollegeSlice;

  const {
    allCollege,
    isLoading,
    filter,
    page,
    dataCount,
    dataPerPage,
  } = useSelector(
    (state) => ({
      allCollege: state.college.allCollege,
      isLoading: state.college.isLoading,
      filter: state.college.filter,
      page: state.college.page,
      dataCount: state.college.dataCount,
      dataPerPage: state.college.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllCollege()
      .then((res) => {
        dispatch(actions.setAllCollege(res?.data?.data?.collage_data?.rows));
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
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CollegeTable allCollege={allCollege} />
    </Paper>
  );
};

export default College;
