import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "role_id",
    label: "Role Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Role Name",
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

const getFormattedData = (roleData) => ({
  id: {
    display: false,
    label: "Role id",
    data: roleData.role_id,
  },
  role_id: {
    align: "left",
    display: true,
    label: "Role Id",
    data: roleData.role_id,
  },
  title: {
    align: "left",
    label: "Role",
    display: true,
    data: roleData.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      roleData.created_datetime !== null
        ? getCurrentDateTime(new Date(roleData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      roleData.updated_datetime !== null
        ? getCurrentDateTime(new Date(roleData.updated_datetime))
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
            roleData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            roleData.is_active === 1
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
        {roleData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: roleData.is_active === 1 ? true : false,
  },
});

const RoleTableConfig = {
  getFormattedData,
  columns,
};

export default RoleTableConfig;
