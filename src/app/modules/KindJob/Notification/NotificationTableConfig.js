import React from "react";
import noPhoto from "../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "image",
    label: "Image",
    align: "left",
    sort: false,
  },
  {
    id: "message",
    label: "Message",
    align: "left",
    sort: false,
  },
  {
    id: "user_count",
    label: "User Count",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: false,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: false,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "100px", width: "100px" },
  },
];

const getFormattedData = (notificationData, index) => ({
  id: {
    display: false,
    label: "Custom notification id",
    data: notificationData.custom_notification_id,
  },
  sr_no: {
    align: "left",
    display: true,
    label: "Sr No",
    data: index + 1,
  },
  image: {
    align: "left",
    label: "Image",
    display: true,
    data: (
      <img
        src={notificationData.image || noPhoto}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = `${noPhoto}`;
        }}
        style={{
          objectFit: "contain",
          width: "auto",
          height: "auto",
          maxWidth: "80px",
          maxHeight: "80px",
        }}
        alt="no_image"
      />
    ),
  },
  message: {
    align: "left",
    label: "Message",
    display: true,
    data: notificationData.message,
  },
  user_count: {
    align: "left",
    label: "User Counts",
    display: true,
    data: notificationData.user_count,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      notificationData.created_datetime !== null
        ? getCurrentDateTime(new Date(notificationData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      notificationData.updated_datetime !== null
        ? getCurrentDateTime(new Date(notificationData.updated_datetime))
        : "-",
  },
});

const NotificationTableConfig = {
  getFormattedData,
  columns,
};

export default NotificationTableConfig;
