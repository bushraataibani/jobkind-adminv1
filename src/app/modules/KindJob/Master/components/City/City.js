import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../../../_redux/City/CityCrud";
import { CitySlice } from "../../../_redux/City/CitySlice";
import { getAllCountry } from "../../../_redux/Country/CountryCrud";
import { CountrySlice } from "../../../_redux/Country/CountrySlice";
import { getAllState } from "../../../_redux/State/StateCrud";
import { StateSlice } from "../../../_redux/State/StateSlice";
import CityTable from "./components/CityTable/CityTable";

const City = () => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;
  const { actions: AcState } = StateSlice;
  const { actions: AcCountry } = CountrySlice;

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
  }, [page, dataPerPage]);

  const getAllStateList = () => {
    getAllState({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(AcState.setAllState(res?.data?.data?.state_data?.rows));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllStateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllCountryList = () => {
    getAllCountry({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(AcCountry.setAllCountry(res?.data?.data?.country_data?.rows));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllCountryList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CityTable allCity={allCity} getAllData={getAllData} />
    </Paper>
  );
};

export default City;
