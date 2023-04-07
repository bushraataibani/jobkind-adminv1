import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../../_redux/City/CityCrud";
import { CitySlice } from "../../../_redux/City/CitySlice";
import CityTable from "./components/CityTable/CityTable";

const City = () => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;

  const { allCity, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allCity: state.city.allCity,
      filter: state.city.filter,
      page: state.city.page,
      dataPerPage: state.city.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllCity({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllCity(res?.data?.data?.city_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.city_data?.count,
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
      <CityTable allCity={allCity} getAllData={getAllData} />
    </Paper>
  );
};

export default City;
