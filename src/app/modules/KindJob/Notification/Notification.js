import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllNotification } from "../_redux/Notification/NotificationCrud";
import { NotificationSlice } from "../_redux/Notification/NotificationSlice";
import NotificationTable from "./components/NotificationTable/NotificationTable";

const Notification = () => {
  const dispatch = useDispatch();
  const { actions } = NotificationSlice;

  const { allNotification, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allNotification: state.notification.allNotification,
      filter: state.notification.filter,
      page: state.notification.page,
      dataPerPage: state.notification.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllNotification({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllNotification(res?.data?.data?.notification_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.notification_data?.count,
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
      <NotificationTable
        allNotification={allNotification}
        getAllData={getAllData}
      />
    </Paper>
  );
};

export default Notification;
