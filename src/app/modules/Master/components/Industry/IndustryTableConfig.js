import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

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
    label: "Active?",
    display: true,
    data: (
      <Checkbox
        color="success"
        icon={<RadioButtonCheckedIcon color="#B00020" />}
        checkedIcon={<RadioButtonCheckedIcon />}
        name="checkedH"
        checked={industryData.is_active === 1 ? true : false || false}
        disableRipple
        style={{ cursor: "initial" }}
      />
    ),
  },
});

const IndustryTableConfig = {
  getFormattedData,
  columns,
};

export default IndustryTableConfig;
