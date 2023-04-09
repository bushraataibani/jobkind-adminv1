import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCountry } from "../../../_redux/Country/CountryCrud";
import { CountrySlice } from "../../../_redux/Country/CountrySlice";
import CountryTable from "./components/CountryTable/CountryTable";

const Country = () => {
  const dispatch = useDispatch();
  const { actions } = CountrySlice;

  const { allCountry, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allCountry: state.country.allCountry,
      filter: state.country.filter,
      page: state.country.page,
      dataPerPage: state.country.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllCountry({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllCountry(res?.data?.data?.country_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.country_data?.count,
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
      <CountryTable allCountry={allCountry} getAllData={getAllData} />
    </Paper>
  );
};

export default Country;
