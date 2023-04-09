import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllArea } from "../../../_redux/Area/AreaCrud";
import { AreaSlice } from "../../../_redux/Area/AreaSlice";
import AreaTable from "./components/AreaTable/AreaTable";

const Area = () => {
  const dispatch = useDispatch();
  const { actions } = AreaSlice;

  const { allArea, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allArea: state.area.allArea,
      filter: state.area.filter,
      page: state.area.page,
      dataPerPage: state.area.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllArea({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllArea(res?.data?.data?.area_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.area_data?.count,
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
      <AreaTable allArea={allArea} getAllData={getAllData} />
    </Paper>
  );
};

export default Area;
