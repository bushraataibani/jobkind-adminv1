import React from "react";
import noPhoto from "../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../Utils/utils";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "profile_image",
    label: "Profile Image",
    align: "left",
    sort: false,
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    id: "email",
    label: "E-mail",
    align: "left",
    sort: false,
  },
  {
    id: "phone_number",
    label: "Phone Number",
    align: "left",
    sort: false,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    sort: false,
    styles: { maxWidth: "100px", width: "100px" },
  },
  {
    id: "hiring_for",
    label: "Hiring For",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: false,
  },
  {
    id: "updated_datetime",
    label: "Updated At",
    align: "left",
    sort: false,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "140px", width: "140px" },
  },
];

const getFormattedData = (employerData, index) => ({
  id: {
    display: false,
    label: "User id",
    data: employerData.user_id,
  },
  user_id: {
    display: false,
    label: "User ID",
    data: employerData.user_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  profile_image: {
    align: "left",
    label: "Profile Image",
    display: true,
    data: (
      <img
        src={employerData.profile_image || noPhoto}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = `${noPhoto}`;
        }}
        style={{
          objectFit: "contain",
          width: "auto",
          height: "auto",
          maxWidth: "80px",
          maxHeight: "80px",
        }}
        alt="Background_Image"
      />
    ),
  },
  name: {
    align: "left",
    label: "Name",
    display: true,
    data: `${employerData.first_name} ${employerData.last_name}`,
  },
  email: {
    align: "left",
    label: "E-mail",
    display: true,
    data: employerData.email ? employerData.email : "-",
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: employerData.phone_number,
  },
  reason: {
    align: "left",
    label: "Reason",
    display: false,
    data: employerData.reason,
  },
  status: {
    align: "left",
    label: "Status",
    display: true,
    data: (
      <Box
        sx={{
          backgroundColor:
            employerData.status === 4
              ? "rgb(216, 17, 17, 20%)"
              : "rgb(1, 171, 52, 20%)",
          color:
            employerData.status === 4
              ? "rgb(216, 17, 17, 90%)"
              : "rgb(1, 171, 52, 90%)",
          borderRadius: "10px",
          padding: "0px 5px 0px 0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "3px",
        }}
      >
        <FiberManualRecordIcon />
        {employerData.status === 4 ? "Blocked" : "Unblocked"}
      </Box>
    ),
    dataIs: employerData.status,
  },
  hiring_for: {
    align: "center",
    label: "Hiring For",
    display: true,
    data:
      employerData.hiring_for === 0
        ? "Company"
        : employerData.hiring_for === 1
        ? "Client"
        : employerData.hiring_for,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      employerData.created_datetime !== null
        ? getCurrentDateTime(new Date(employerData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      employerData.updated_datetime !== null
        ? getCurrentDateTime(new Date(employerData.updated_datetime))
        : "-",
  },
});

const employerJobColumns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "job_title",
    label: "Job Title",
    align: "left",
    sort: false,
  },
  {
    id: "company_name",
    label: "Company Name",
    align: "left",
    sort: false,
  },
  {
    id: "location",
    label: "Location",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created Date",
    align: "left",
    sort: false,
  },
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "100px", width: "100px" },
  },
];

const getFormattedEmployerJob = (employerData, index) => ({
  id: {
    display: false,
    label: "Main Job ID",
    data: employerData.main_job_id,
  },
  user_id: {
    display: false,
    label: "User ID",
    data: employerData.user_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  job_title: {
    align: "left",
    label: "Job Title",
    display: true,
    data: employerData.job_title || "-",
  },
  company_name: {
    align: "left",
    label: "Company",
    display: true,
    data: employerData.company_name ? employerData.company_name : "-",
  },
  location: {
    align: "left",
    label: "Location",
    display: true,
    data: `${
      employerData.job_location_area ? employerData.job_location_area : "-"
    } ${employerData.job_location_city ? employerData.job_location_city : "-"}`,
  },
  created_datetime: {
    align: "left",
    label: "Created Date",
    display: true,
    data:
      employerData.created_datetime !== null
        ? getCurrentDateTime(new Date(employerData.created_datetime))
        : "-",
  },
});

const employerApplyJobColumns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    sort: false,
  },
  {
    id: "email",
    label: "E-mail",
    align: "left",
    sort: false,
  },
  {
    id: "phone_number",
    label: "Phone Number",
    align: "left",
    sort: false,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    sort: false,
  },
  {
    id: "reason",
    label: "Reason",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created Date",
    align: "left",
    sort: false,
  },
  {
    id: "updated_datetime",
    label: "Updated Date",
    align: "left",
    sort: false,
  },
];

const getFormattedEmployerApplyJob = (employerData, index) => ({
  id: {
    display: false,
    label: "User Job Apply ID",
    data: employerData.user_job_apply_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  name: {
    align: "left",
    label: "Name",
    display: true,
    data: `${employerData.user.first_name} ${employerData.user.last_name}`,
  },
  email: {
    align: "left",
    label: "E-mail",
    display: true,
    data: employerData.user.email,
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: employerData.user.phone_number,
  },
  status: {
    align: "left",
    label: "Status",
    display: true,
    data: employerData.status,
  },
  reason: {
    align: "left",
    label: "Reason",
    display: true,
    data: employerData.user.reason,
  },
  created_datetime: {
    align: "left",
    label: "Created Date",
    display: true,
    data:
      employerData.created_datetime !== null
        ? getCurrentDateTime(new Date(employerData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated Date",
    display: true,
    data:
      employerData.updated_datetime !== null
        ? getCurrentDateTime(new Date(employerData.updated_datetime))
        : "-",
  },
  actions: {
    hide: true,
  },
});

const employerCoinHistoryColumns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "title",
    label: "Title",
    align: "left",
    sort: false,
  },
  {
    id: "coin",
    label: "Coin",
    align: "left",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created Date",
    align: "left",
    sort: false,
  },
];

const getFormattedEmployerCoinHistory = (employerData, index) => ({
  id: {
    display: false,
    label: "Coin Transaction ID",
    data: employerData.coin_transaction_id,
  },
  user_id: {
    display: false,
    label: "User ID",
    data: employerData.user_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  title: {
    align: "left",
    label: "Title",
    display: true,
    data: employerData.title,
  },
  coin: {
    align: "left",
    label: "Coin",
    display: true,
    data: employerData.coin,
  },
  created_datetime: {
    align: "left",
    label: "Created Date",
    display: true,
    data:
      employerData.created_datetime !== null
        ? getCurrentDateTime(new Date(employerData.created_datetime))
        : "-",
  },

  actions: {
    hide: true,
  },
});

const EmployerTableConfig = {
  getFormattedData,
  columns,
  getFormattedEmployerJob,
  employerJobColumns,
  getFormattedEmployerApplyJob,
  employerApplyJobColumns,
  getFormattedEmployerCoinHistory,
  employerCoinHistoryColumns,
};

export default EmployerTableConfig;
