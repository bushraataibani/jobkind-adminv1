import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllIndustry } from "../../../_redux/Industry/IndustryCrud";
import { IndustrySlice } from "../../../_redux/Industry/IndustrySlice";
import IndustryTable from "./components/IndustryTable/IndustryTable";

const Industry = () => {
  const dispatch = useDispatch();
  const { actions } = IndustrySlice;

  const { allIndustry, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allIndustry: state.industry.allIndustry,
      filter: state.industry.filter,
      page: state.industry.page,
      dataPerPage: state.industry.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllIndustry({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllIndustry(res?.data?.data?.industries_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.industries_data?.count,
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
      <IndustryTable allIndustry={allIndustry} getAllData={getAllData} />
    </Paper>
  );
};

export default Industry;
