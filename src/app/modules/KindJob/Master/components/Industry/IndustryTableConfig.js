import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "industries_id",
    label: "Industry Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Industry Name",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: true,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: true,
  },
  {
    id: "is_active",
    label: "Status",
    align: "left",
    sort: true,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (industryData) => ({
  id: {
    display: false,
    label: "Industry id",
    data: industryData.industries_id,
  },
  industries_id: {
    align: "left",
    display: true,
    label: "Industry Id",
    data: industryData.industries_id,
  },
  title: {
    align: "left",
    label: "Industry Name",
    display: true,
    data: industryData.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      industryData.created_datetime !== null
        ? getCurrentDateTime(new Date(industryData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      industryData.updated_datetime !== null
        ? getCurrentDateTime(new Date(industryData.updated_datetime))
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
            industryData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            industryData.is_active === 1
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
        {industryData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: industryData.is_active === 1 ? true : false,
  },
});

const IndustryTableConfig = {
  getFormattedData,
  columns,
};

export default IndustryTableConfig;
