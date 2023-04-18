import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllSubscribe } from "../_redux/Subscribe/SubscribeCrud";
import { SubscribeSlice } from "../_redux/Subscribe/SubscribeSlice";
import SubscribeTable from "./components/SubscribeTable/SubscribeTable";

const Subscribe = () => {
  const dispatch = useDispatch();
  const { actions } = SubscribeSlice;

  const { allSubscribe, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allSubscribe: state.subscribe.allSubscribe,
      filter: state.subscribe.filter,
      page: state.subscribe.page,
      dataPerPage: state.subscribe.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllSubscribe({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllSubscribe(res?.data?.data?.subscribe_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.subscribe_data?.count,
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
      <SubscribeTable allSubscribe={allSubscribe} getAllData={getAllData} />
    </Paper>
  );
};

export default Subscribe;
