import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllState } from "../../../_redux/State/StateCrud";
import { getAllCountry } from "../../../_redux/Country/CountryCrud";
import { StateSlice } from "../../../_redux/State/StateSlice";
import { CountrySlice } from "../../../_redux/Country/CountrySlice";
import StateTable from "./components/StateTable/StateTable";

const State = () => {
  const dispatch = useDispatch();
  const { actions } = StateSlice;
  const { actions: AcCoun } = CountrySlice;

  const { allState, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allState: state.state.allState,
      filter: state.state.filter,
      page: state.state.page,
      dataPerPage: state.state.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllState({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllState(res?.data?.data?.state_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.state_data?.count,
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

  const getAllCou = () => {
    getAllCountry({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(AcCoun.setAllCountry(res?.data?.data?.country_data?.rows));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllCou();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <StateTable allState={allState} getAllData={getAllData} />
    </Paper>
  );
};

export default State;
