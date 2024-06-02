import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import parse from "html-react-parser";
import React from "react";
import noPhoto from "../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../Utils/utils";
import "./style.css";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "company_logo",
    label: "Company Logo",
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
    id: "job_title",
    label: "Title",
    align: "left",
    sort: false,
  },
  {
    id: "job_description",
    label: "Description",
    align: "left",
    sort: false,
  },
  {
    id: "is_active",
    label: "Status",
    align: "left",
    sort: false,
  },
  {
    id: "total_apply_count",
    label: "Total Apply Count",
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
    styles: { maxWidth: "100px", width: "100px" },
  },
];

const getFormattedData = (jobsData, index, setShowApplyEmployeeModal, setSelectedRow) => ({
  id: {
    display: false,
    label: "main_job_id",
    data: jobsData.main_job_id,
  },
  sr_no: {
    align: "left",
    display: true,
    label: "Sr No",
    data: index + 1,
  },
  company_logo: {
    align: "left",
    label: "Company Logo",
    display: true,
    data: (
      <img
        src={jobsData.company_logo || noPhoto}
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
  company_name: {
    align: "left",
    display: true,
    label: "Company Name",
    data: jobsData.company_name || "-",
  },
  job_title: {
    align: "left",
    display: true,
    label: "Title",
    data: jobsData.job_title,
  },
  job_description: {
    align: "left",
    display: true,
    label: "Description",
    data: <div className="cutoff-text">{parse(jobsData.job_description)}</div>,
    clickable: true,
    dataIs: parse(jobsData.job_description),
  },
  is_active: {
    align: "left",
    display: true,
    label: "Status",
    data: (
      <Box
        sx={{
          backgroundColor:
            jobsData.is_active === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            jobsData.is_active === 1
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
        {jobsData.is_active === 1 ? "Active" : "Inactive"}
      </Box>
    ),
    dataIs: jobsData.is_active === 1 ? true : false,
  },
  total_apply_count: {
    align: "center",
    display: true,
    label: "Total Apply Count",
    val: "total_apply_count",
    clickable: jobsData?.total_apply_count > 0 ? true : false,
    onclick: (e) => {
      if (jobsData?.total_apply_count > 0) {
        setShowApplyEmployeeModal(true);
        setSelectedRow(jobsData);
      }
    },
    data: jobsData.total_apply_count || "-",
  },
  user: {
    align: "center",
    display: false,
    label: "User",
    data: jobsData.user || "-",
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      jobsData.created_datetime !== null
        ? getCurrentDateTime(new Date(jobsData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      jobsData.updated_datetime !== null
        ? getCurrentDateTime(new Date(jobsData.updated_datetime))
        : "-",
  },
});

const empColumns = [
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
    label: "Email",
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
    id: "total_jobs",
    label: "total Jobs",
    align: "left",
    sort: false,
  },
  {
    id: "total_success_job",
    label: "Total Success Job",
    align: "center",
    sort: false,
  },
  {
    id: "created_datetime",
    label: "Created At",
    align: "left",
    sort: false,
  },
];


const getFormattedEmpData = (empData, index) => ({
  id: {
    display: false,
    label: "id",
    data: empData.user_id,
  },
  sr_no: {
    align: "left",
    display: true,
    label: "Sr No",
    data: index + 1,
  },
  name: {
    align: "left",
    display: true,
    label: "Name",
    clickable: true,
    click: true,
    data: `${empData.first_name || "-"} ${empData.last_name || "-"}`,
  },
  email: {
    align: "left",
    display: true,
    label: "Email",
    data: empData.email,
  },
  phone_number: {
    align: "left",
    display: true,
    label: "Phone Number",
    data: empData?.phone_number,
  },
  total_jobs: {
    align: "center",
    display: true,
    label: "Total Jobs",
    data: empData.total_jobs || "-",
  },
  total_success_job: {
    align: "center",
    display: true,
    label: "Total Success Job",
    data: empData.total_success_job || "-",
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      empData.created_datetime !== null
        ? getCurrentDateTime(new Date(empData.created_datetime))
        : "-",
  },
  actions: {
    hide: true,
  },
});

// {
//   "user_id": 305,
//   "first_name": "Godugu",
//   "last_name": "vijay",
//   "email": "Vijaymudhiraj506@gmail.com",
//   "phone_number": "918309460224",
//   "total_jobs": 2
// }

const applyEmployeeColumns = [
  {
    id: "user_id",
    label: "User Id",
    align: "left",
    sort: false,
  },
  {
    id: "first_name",
    label: "First Name",
    align: "left",
    sort: false,
  },
  {
    id: "last_name",
    label: "Last Name",
    align: "left",
    sort: false,
  },
  {
    id: "email",
    label: "Email",
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
    id: "total_jobs",
    label: "Total Jobs",
    align: "left",
    sort: false,
  },
]

const getFormattedApplyEmployeeData = (empData, index) => ({
  id: {
    display: false,
    label: "id",
    data: empData.user_id,
  },
  user_id: {
    align: "left",
    display: true,
    label: "User Id",
    data: empData.user_id,
  },
  first_name: {
    align: "left",
    display: true,
    label: "First Name",
    data: empData.first_name,
  },
  last_name: {
    align: "left",
    display: true,
    label: "Last Name",
    data: empData.last_name,
  },
  email: {
    align: "left",
    display: true,
    label: "Email",
    data: empData.email,
  },
  phone_number: {
    align: "left",
    display: true,
    label: "Phone Number",
    data: empData.phone_number,
  },
  total_jobs: {
    align: "left",
    display: true,
    label: "Total Jobs",
    data: empData.total_jobs,
  },
});

const JobDetailTableConfig = {
  getFormattedData,
  columns,
  getFormattedEmpData,
  empColumns,
  applyEmployeeColumns,
  getFormattedApplyEmployeeData,
};

export default JobDetailTableConfig;
