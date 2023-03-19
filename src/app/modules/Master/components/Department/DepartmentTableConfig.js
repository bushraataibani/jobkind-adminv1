import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

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
    label: "Active?",
    align: "left",
    sort: true,
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
    label: "Active?",
    display: true,
    data: (
      <Checkbox
        color="success"
        icon={<RadioButtonCheckedIcon color="#B00020" />}
        checkedIcon={<RadioButtonCheckedIcon />}
        name="checkedH"
        checked={departmentData.is_active === 1 ? true : false || false}
        disableRipple
        style={{ cursor: "initial" }}
      />
    ),
  },
});

const DepartmentTableConfig = {
  getFormattedData,
  columns,
};

export default DepartmentTableConfig;
