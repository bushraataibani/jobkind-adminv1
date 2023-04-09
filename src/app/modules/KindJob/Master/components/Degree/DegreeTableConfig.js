import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "degree_id",
    label: "Degree Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Degree",
    align: "left",
    sort: false,
  },
  {
    id: "educationTitle",
    label: " Education",
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

const getFormattedData = (degreeData) => {
  return {
    id: {
      display: false,
      label: "Degree id",
      data: degreeData.degree_id,
    },
    degree_id: {
      align: "left",
      display: true,
      label: "Degree Id",
      data: degreeData.degree_id,
    },
    title: {
      align: "left",
      label: "Title",
      display: true,
      data: degreeData.title,
    },
    educationTitle: {
      align: "left",
      label: "Education Name",
      display: true,
      data: degreeData?.education?.title,
    },
    education_id: {
      align: "left",
      label: "City ",
      display: false,
      data: {
        label: degreeData.education.title,
        value: degreeData.education.education_id,
      },
    },
    created_datetime: {
      align: "left",
      label: "Created At",
      display: true,
      data:
        degreeData.created_datetime !== null
          ? getCurrentDateTime(new Date(degreeData.created_datetime))
          : "-",
    },
    updated_datetime: {
      align: "left",
      label: "Updated At",
      display: true,
      data:
        degreeData.updated_datetime !== null
          ? getCurrentDateTime(new Date(degreeData.updated_datetime))
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
              degreeData.is_active === 1
                ? "rgb(1, 171, 52, 20%)"
                : "rgb(216, 17, 17, 20%)",
            color:
              degreeData.is_active === 1
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
          {degreeData.is_active === 1 ? "Active" : "Inactive"}
        </Box>
      ),
      dataIs: degreeData.is_active === 1 ? true : false,
    },
  };
};

const DegreeTableConfig = {
  getFormattedData,
  columns,
};

export default DegreeTableConfig;
