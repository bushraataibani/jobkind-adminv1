import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

const columns = [
  {
    id: "country_id",
    label: "Country Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Title",
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
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (countryData) => ({
  id: {
    display: false,
    label: "Country id",
    data: countryData.country_id,
  },
  country_id: {
    align: "left",
    display: true,
    label: "Country Id",
    data: countryData.country_id,
  },
  title: {
    align: "left",
    label: "Title",
    display: true,
    data: countryData.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      countryData.created_datetime !== null
        ? getCurrentDateTime(new Date(countryData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      countryData.updated_datetime !== null
        ? getCurrentDateTime(new Date(countryData.updated_datetime))
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
            countryData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            countryData.is_active === 1
              ? "rgb(1, 171, 52, 90%)"
              : "rgb(216, 17, 17, 90%)",
          borderRadius: "10px",
          padding: "0px 5px 0px 0px",
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "3px",
        }}
      >
        <FiberManualRecordIcon />
        {countryData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: countryData.is_active === 1 ? true : false,
  },
});

const CountryTableConfig = {
  getFormattedData,
  columns,
};

export default CountryTableConfig;
