import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

const columns = [
  {
    id: "collage_id",
    label: "College Id",
    align: "left",
    sort: true,
  },
  {
    id: "collage_name",
    label: "College Name",
    align: "left",
    sort: false,
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    sort: true,
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

const getFormattedData = (collegeData) => ({
  id: {
    display: false,
    label: "Collage id",
    data: collegeData.collage_id,
  },
  collage_id: {
    align: "left",
    display: true,
    label: "College Id",
    data: collegeData.collage_id,
  },
  collage_name: {
    align: "left",
    label: "College Name",
    display: true,
    data: collegeData.collage_name,
  },
  address: {
    align: "left",
    label: "Address",
    display: true,
    data: collegeData.address,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      collegeData.created_datetime !== null
        ? getCurrentDateTime(new Date(collegeData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      collegeData.updated_datetime !== null
        ? getCurrentDateTime(new Date(collegeData.updated_datetime))
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
            collegeData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            collegeData.is_active === 1
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
        {collegeData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: collegeData.is_active === 1 ? true : false,
  },
});

const CollegeTableConfig = {
  getFormattedData,
  columns,
};

export default CollegeTableConfig;
