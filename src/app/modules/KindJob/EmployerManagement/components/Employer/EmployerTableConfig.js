import React from "react";
import noPhoto from "../../../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../../../Utils/utils";

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
    id: "reason",
    label: "Reason",
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
    styles: { maxWidth: "100px", width: "100px" },
  },
];

const getFormattedData = (employerData, index) => ({
  id: {
    display: false,
    label: "User id",
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
    label: "Email",
    display: true,
    data: employerData.email,
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: employerData.phone_number,
  },
  reason: {
    align: "center",
    display: true,
    label: "Reason",
    data: employerData.reason !== null ? employerData.reason : "-",
  },
  status: {
    align: "left",
    label: "Status",
    display: true,
    data: employerData.status,
  },
  hiring_for: {
    align: "center",
    label: "Hiring For",
    display: true,
    data: employerData.hiring_for,
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

const employerCol = [
  {
    id: "sr_no",
    label: "Sr No",
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
    id: "company_website_url",
    label: "Website",
    align: "left",
    sort: false,
  },
  {
    id: "industries_id",
    label: "Industry Id",
    align: "left",
    sort: false,
  },
  {
    id: "no_of_employee",
    label: "Number of Employee",
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

const getFormattedEmployer = (employerData, index) => ({
  id: {
    display: false,
    label: "User Company ID",
    data: employerData.user_company_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  company_name: {
    align: "left",
    label: "Company Name",
    display: true,
    data: employerData.company_name,
  },
  company_website_url: {
    align: "left",
    label: "Website",
    display: true,
    data: employerData.company_website_url,
  },
  industries_id: {
    align: "left",
    label: "Industry",
    display: true,
    data: employerData.industries_id,
  },
  no_of_employee: {
    align: "left",
    label: "No of Employee",
    display: true,
    data: employerData.no_of_employee || "-",
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

const EmployerTableConfig = {
  getFormattedData,
  columns,
  getFormattedEmployer,
  employerCol,
};

export default EmployerTableConfig;
