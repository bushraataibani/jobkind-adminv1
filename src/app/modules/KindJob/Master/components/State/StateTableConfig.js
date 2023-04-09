import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "state_id",
    label: "State Id",
    align: "left",
    sort: true,
  },
  {
    id: "state_name",
    label: "State Name",
    align: "left",
    sort: false,
  },
  {
    id: "state_code",
    label: "State Code",
    align: "left",
    sort: false,
  },
  {
    id: "country_name",
    label: "Country Name",
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

const getFormattedData = (stateData) => ({
  id: {
    display: false,
    label: "State id",
    data: stateData.state_id,
  },
  state_id: {
    align: "left",
    display: true,
    label: "State Id",
    data: stateData.state_id,
  },
  state_name: {
    align: "left",
    label: "State",
    display: true,
    data: stateData.state_name,
  },
  state_code: {
    align: "left",
    label: "State Code",
    display: true,
    data: stateData.state_code,
  },
  country_name: {
    align: "left",
    label: "Country",
    display: true,
    data: stateData.country?.country_name,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      stateData.created_datetime !== null
        ? getCurrentDateTime(new Date(stateData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      stateData.updated_datetime !== null
        ? getCurrentDateTime(new Date(stateData.updated_datetime))
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
            stateData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            stateData.is_active === 1
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
        {stateData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: stateData.is_active === 1 ? true : false,
  },
});

const StateTableConfig = {
  getFormattedData,
  columns,
};

export default StateTableConfig;
