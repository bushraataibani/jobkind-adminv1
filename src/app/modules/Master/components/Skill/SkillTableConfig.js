import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { Checkbox } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

const columns = [
  {
    id: "skill_id",
    label: "Skill Id",
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

const getFormattedData = (skillData) => ({
  id: {
    display: false,
    label: "Skill id",
    data: skillData.skill_id,
  },
  skill_id: {
    align: "left",
    display: true,
    label: "Skill Id",
    data: skillData.skill_id,
  },
  title: {
    align: "left",
    label: "Title",
    display: true,
    data: skillData.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      skillData.created_datetime !== null
        ? getCurrentDateTime(new Date(skillData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      skillData.updated_datetime !== null
        ? getCurrentDateTime(new Date(skillData.updated_datetime))
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
        checked={skillData.is_active === 1 ? true : false || false}
        disableRipple
        style={{ cursor: "initial" }}
      />
    ),
  },
});

const SkillTableConfig = {
  getFormattedData,
  columns,
};

export default SkillTableConfig;
