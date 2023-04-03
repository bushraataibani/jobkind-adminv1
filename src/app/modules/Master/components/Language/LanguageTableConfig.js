import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

const columns = [
  {
    id: "language_id",
    label: "Language Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Language Name",
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

const getFormattedData = (languageData) => ({
  id: {
    display: false,
    label: "Language id",
    data: languageData.language_id,
  },
  language_id: {
    align: "left",
    display: true,
    label: "Language Id",
    data: languageData.language_id,
  },
  title: {
    align: "left",
    label: "Language Name",
    display: true,
    data: languageData.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      languageData.created_datetime !== null
        ? getCurrentDateTime(new Date(languageData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      languageData.updated_datetime !== null
        ? getCurrentDateTime(new Date(languageData.updated_datetime))
        : "-",
  },
  is_active: {
    align: "left",
    label: "Status",
    display: true,
    data: (
      <Checkbox
        color="success"
        icon={<RadioButtonCheckedIcon color="#B00020" />}
        checkedIcon={<RadioButtonCheckedIcon />}
        name="checkedH"
        checked={languageData.is_active === 1 ? true : false || false}
        disableRipple
        style={{ cursor: "initial" }}
      />
    ),
  },
});

const LanguageTableConfig = {
  getFormattedData,
  columns,
};

export default LanguageTableConfig;
