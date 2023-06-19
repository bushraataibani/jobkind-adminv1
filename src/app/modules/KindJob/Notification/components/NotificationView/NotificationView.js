/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../Utils/utils";
import {
  getAllNotification,
  sendNotificationToServer,
  viewNotificationFromServer,
} from "../../../_redux/Notification/NotificationCrud";
import { NotificationSlice } from "../../../_redux/Notification/NotificationSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import NotificationViewForm from "./NotificationViewForm";

const NotificationView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = NotificationSlice;
  const { actions: generalActions } = generalSlice;

  const {
    selectedNotification,
    filter,
    page,
    dataPerPage,
    allUser,
  } = useSelector(
    (state) => ({
      selectedNotification: state.notification.selectedNotification,
      filter: state.notification.filter,
      page: state.notification.page,
      dataPerPage: state.notification.dataPerPage,
      allUser: state.notification.allUser,
    }),
    shallowEqual
  );
  console.log(id, "id");

  const getAllNotificatiobByID = () => {
    if (id !== null) {
      viewNotificationFromServer(id).then((res) => console.log(res, "res"));
    }
  };

  useEffect(() => {
    getAllNotificatiobByID();
  }, [id]);

  const saveNotification = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return sendNotificationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Notification", "updated"),
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
    <>
      {selectedNotification && show && (
        <NotificationViewForm
          show={show}
          onHide={onHide}
          saveNotification={saveNotification}
          selectedNotification={selectedNotification}
          allUser={allUser}
        />
      )}
    </>
  );
};

export default NotificationView;
