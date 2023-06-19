import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../Utils/utils";
import { generalSlice } from "../../../_redux/general/generalSlice";
import {
  getAllNotification,
  sendNotificationToServer,
} from "../../../_redux/Notification/NotificationCrud";
import { NotificationSlice } from "../../../_redux/Notification/NotificationSlice";
import NotificationAddForm from "./NotificationAddForm";

const NotificationAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = NotificationSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.notification.filter,
      page: state.notification.page,
      dataPerPage: state.notification.dataPerPage,
    }),
    shallowEqual
  );

  const addNotification = (data) => {
    const dataToServer = cleanObject(data);

    return sendNotificationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Notification", "added"),
          type: "success",
        })
      );

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
    });
  };

  return (
    <NotificationAddForm
      show={show}
      onHide={onHide}
      addNotification={addNotification}
    />
  );
};

export default NotificationAdd;
