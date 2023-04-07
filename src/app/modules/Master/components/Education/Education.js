import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllEducation } from "../../../_redux/Education/EducationCrud";
import { EducationSlice } from "../../../_redux/Education/EducationSlice";
import EducationTable from "./components/EducationTable/EducationTable";

const Education = () => {
  const dispatch = useDispatch();
  const { actions } = EducationSlice;

  const { allEducation, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allEducation: state.education.allEducation,
      filter: state.education.filter,
      page: state.education.page,
      dataPerPage: state.education.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllEducation({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllEducation(res?.data?.data?.educations_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.educations_data?.count,
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
      <EducationTable allEducation={allEducation} getAllData={getAllData} />
    </Paper>
  );
};

export default Education;
