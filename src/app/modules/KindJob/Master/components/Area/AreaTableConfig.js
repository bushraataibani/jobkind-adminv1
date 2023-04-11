import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "area_id",
    label: "Area Id",
    align: "left",
    sort: false,
  },
  {
    id: "area_name",
    label: "Area Name",
    align: "left",
    sort: false,
  },
  {
    id: "city_name",
    label: "City Name",
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

const getFormattedData = (areaData) => ({
  id: {
    display: false,
    label: "Area id",
    data: areaData.area_id,
  },
  area_id: {
    align: "left",
    display: true,
    label: "Area Id",
    data: areaData.area_id,
  },
  area_name: {
    align: "left",
    label: "Area",
    display: true,
    data: areaData.area_name,
  },
  city_id: {
    align: "left",
    label: "City ",
    display: false,
    data: { label: areaData.city.city_name, value: areaData.city.city_id },
  },
  city_name: {
    align: "left",
    label: "City",
    display: true,
    data: areaData.city.city_name,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      areaData.created_datetime !== null
        ? getCurrentDateTime(new Date(areaData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      areaData.updated_datetime !== null
        ? getCurrentDateTime(new Date(areaData.updated_datetime))
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
            areaData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            areaData.is_active === 1
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
        {areaData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: areaData.is_active === 1 ? true : false,
  },
});

const AreaTableConfig = {
  getFormattedData,
  columns,
};

export default AreaTableConfig;
