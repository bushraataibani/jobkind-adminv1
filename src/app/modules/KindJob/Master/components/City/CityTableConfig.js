import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "city_name",
    label: "City",
    align: "left",
    sort: false,
  },
  {
    id: "state_name",
    label: "State",
    align: "left",
    sort: false,
  },
  {
    id: "country_name",
    label: "Country",
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
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "160px", width: "160px" },
  },
];

const getFormattedData = (cityData, index) => ({
  id: {
    display: false,
    label: "City id",
    data: cityData.city_id,
  },
  city_id: {
    align: "left",
    display: false,
    label: "City Id",
    data: cityData.city_id,
  },
  sr_no: {
    align: "left",
    display: true,
    label: "Sr No",
    data: index + 1,
  },
  city_name: {
    align: "left",
    label: "City",
    display: true,
    data: cityData.city_name,
  },
  state_name: {
    align: "left",
    label: "State",
    display: true,
    data: cityData.state?.state_name,
  },
  state_id: {
    align: "left",
    label: "State ID",
    display: false,
    data: {
      label: cityData?.state?.state_name,
      value: cityData?.state?.state_id,
    },
  },
  country_name: {
    align: "left",
    label: "Country",
    display: true,
    data: cityData.state?.country?.country_name,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      cityData.created_datetime !== null
        ? getCurrentDateTime(new Date(cityData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      cityData.updated_datetime !== null
        ? getCurrentDateTime(new Date(cityData.updated_datetime))
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
            cityData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            cityData.is_active === 1
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
        {cityData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: cityData.is_active === 1 ? true : false,
  },
});

const CityTableConfig = {
  getFormattedData,
  columns,
};

export default CityTableConfig;
