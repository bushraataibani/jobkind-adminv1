import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import { getCurrentDateTime } from "../../../Utils/utils";

const columns = [
  {
    id: "specialization_id",
    label: "Specialization Id",
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
    id: "degreeName",
    label: "Degree Name",
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

const getFormattedData = (specializationData) => ({
  id: {
    display: false,
    label: "Specialization id",
    data: specializationData.specialization_id,
  },
  specialization_id: {
    align: "left",
    display: true,
    label: "Specialization Id",
    data: specializationData.specialization_id,
  },
  title: {
    align: "left",
    label: "Title",
    display: true,
    data: specializationData.title,
  },
  degreeTitle: {
    align: "left",
    label: "Degree Name",
    display: true,
    data: specializationData.degree?.title,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      specializationData.created_datetime !== null
        ? getCurrentDateTime(new Date(specializationData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      specializationData.updated_datetime !== null
        ? getCurrentDateTime(new Date(specializationData.updated_datetime))
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
            specializationData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            specializationData.is_active === 1
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
        {specializationData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: specializationData.is_active === 1 ? true : false,
  },
});

const SpecializationTableConfig = {
  getFormattedData,
  columns,
};

export default SpecializationTableConfig;
