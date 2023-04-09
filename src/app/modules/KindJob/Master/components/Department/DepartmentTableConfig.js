import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "department_id",
    label: "Department Id",
    align: "left",
    sort: true,
  },
  {
    id: "department_name",
    label: "Department Name",
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

const getFormattedData = (departmentData) => ({
  id: {
    display: false,
    label: "Department id",
    data: departmentData.department_id,
  },
  department_id: {
    align: "left",
    display: true,
    label: "Department Id",
    data: departmentData.department_id,
  },
  department_name: {
    align: "left",
    label: "Department Name",
    display: true,
    data: departmentData.department_name,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      departmentData.created_datetime !== null
        ? getCurrentDateTime(new Date(departmentData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      departmentData.updated_datetime !== null
        ? getCurrentDateTime(new Date(departmentData.updated_datetime))
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
            departmentData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            departmentData.is_active === 1
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
        {departmentData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: departmentData.is_active === 1 ? true : false,
  },
});

const DepartmentTableConfig = {
  getFormattedData,
  columns,
};

export default DepartmentTableConfig;
