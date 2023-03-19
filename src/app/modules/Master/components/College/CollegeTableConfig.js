import React from "react";
import moment from "moment";
import { Checkbox } from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
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
    label: "Active?",
    display: true,
    data: (
      <Checkbox
        color="success"
        icon={<RadioButtonCheckedIcon color="#B00020" />}
        checkedIcon={<RadioButtonCheckedIcon />}
        name="checkedH"
        checked={collegeData.is_active === 1 ? true : false || false}
        disableRipple
        style={{ cursor: "initial" }}
      />
    ),
  },
});

const CollegeTableConfig = {
  getFormattedData,
  columns,
};

export default CollegeTableConfig;
