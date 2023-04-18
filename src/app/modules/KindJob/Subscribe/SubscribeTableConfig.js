import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "email_address",
    label: "Email",
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
    id: "is_active",
    label: "Status",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  // {
  //   label: "Actions",
  //   align: "center",
  //   styles: { maxWidth: "160px", width: "160px" },
  // },
];

const getFormattedData = (subscribeData, index) => ({
  id: {
    display: false,
    label: "Subscribe id",
    data: subscribeData.subscriber_id,
  },
  subscriber_id: {
    align: "left",
    display: false,
    label: "Subscribe Id",
    data: subscribeData.subscriber_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  email_address: {
    align: "left",
    display: true,
    label: "Email",
    data: subscribeData.email_address,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      subscribeData.created_datetime !== null
        ? getCurrentDateTime(new Date(subscribeData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      subscribeData.updated_datetime !== null
        ? getCurrentDateTime(new Date(subscribeData.updated_datetime))
        : "-",
  },
  is_active: {
    align: "left",
    label: "Status",
    display: true,
    data: (
      <Box
        sx={{
          backgroundColor:
            subscribeData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            subscribeData.is_active === 1
              ? "rgb(1, 171, 52, 90%)"
              : "rgb(216, 17, 17, 90%)",
          borderRadius: "10px",
          padding: "0px 5px 0px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "3px",
        }}
      >
        <FiberManualRecordIcon />
        {subscribeData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: subscribeData.is_active === 1 ? true : false,
  },
  actions: {
    hide: true,
  },
});

const SubscribeTableConfig = {
  getFormattedData,
  columns,
};

export default SubscribeTableConfig;
