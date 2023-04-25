import React from "react";
import noPhoto from "../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
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
    label: "Total Job",
    align: "left",
    sort: false,
  },
  {
    id: "total_success_job",
    label: "Success Job",
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
];

const getFormattedData = (employeeData, index) => ({
  id: {
    display: false,
    label: "User id",
    data: employeeData.user_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  first_name: {
    align: "left",
    label: "First Name",
    display: true,
    data: employeeData.first_name,
  },
  last_name: {
    align: "left",
    label: "Last Name",
    display: true,
    data: employeeData.last_name,
  },
  email: {
    align: "left",
    label: "Email",
    display: true,
    data: employeeData.email,
  },
  phone_number: {
    align: "left",
    label: "Phone Number",
    display: true,
    data: employeeData.phone_number,
  },
  total_jobs: {
    align: "center",
    display: true,
    label: "Total Jobs",
    data: employeeData.total_jobs === 0 ? "0" : employeeData.total_jobs,
    clickable: true,
  },
  total_success_job: {
    align: "center",
    label: "Success Job",
    display: true,
    data:
      employeeData.total_success_job === 0
        ? "0"
        : employeeData.total_success_job,
    clickable: true,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      employeeData.created_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      employeeData.updated_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.updated_datetime))
        : "-",
  },
  actions: {
    hide: true,
  },
});

const totalJobs = [
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
    id: "job_location_area",
    label: "Area",
    align: "left",
    sort: false,
  },
  {
    id: "job_location_city",
    label: "City",
    align: "left",
    sort: false,
  },
  {
    id: "experience",
    label: "Experience",
    align: "left",
    sort: false,
  },
  {
    id: "job_pay_minimum_salary",
    label: "Minimum Salary",
    align: "left",
    sort: false,
  },
  {
    id: "job_pay_maximum_salary",
    label: "Maximum Salary",
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
];

const getFormattedTotalJobs = (employeeData, index) => ({
  id: {
    display: false,
    label: "User Job Apply ID",
    data: employeeData.user_job_apply_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  company_logo: {
    align: "left",
    label: "Company Logo",
    display: true,
    data: (
      <img
        src={employeeData.company_logo || noPhoto}
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
    label: "Company Name",
    display: true,
    data: employeeData.company_name,
  },
  job_location_area: {
    align: "left",
    label: "Area",
    display: true,
    data: employeeData.job_location_area,
  },
  job_location_city: {
    align: "left",
    label: "City",
    display: true,
    data: employeeData.job_location_city,
  },
  experience: {
    align: "left",
    display: true,
    label: "Experience",
    data: employeeData.experience === 0 ? "0" : employeeData.total_jobs,
  },
  job_pay_minimum_salary: {
    align: "left",
    label: "Minimum Salary",
    display: true,
    data:
      employeeData.job_pay_minimum_salary === 0
        ? "0"
        : employeeData.job_pay_minimum_salary,
  },
  job_pay_maximum_salary: {
    align: "left",
    label: "Maximum Salary",
    display: true,
    data:
      employeeData.job_pay_maximum_salary === 0
        ? "0"
        : employeeData.job_pay_maximum_salary,
  },
  status: {
    align: "left",
    label: "Status",
    display: true,
    data: employeeData.status,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      employeeData.created_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      employeeData.updated_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.updated_datetime))
        : "-",
  },
  actions: {
    hide: true,
  },
});

const successJobs = [
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
    id: "job_location_area",
    label: "Area",
    align: "left",
    sort: false,
  },
  {
    id: "job_location_city",
    label: "City",
    align: "left",
    sort: false,
  },
  {
    id: "experience",
    label: "Experience",
    align: "left",
    sort: false,
  },
  {
    id: "job_pay_minimum_salary",
    label: "Minimum Salary",
    align: "left",
    sort: false,
  },
  {
    id: "job_pay_maximum_salary",
    label: "Maximum Salary",
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
];

const getFormattedSuccessJobs = (employeeData, index) => ({
  id: {
    display: false,
    label: "User Job Apply ID",
    data: employeeData.user_job_apply_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  company_logo: {
    align: "left",
    label: "Company Logo",
    display: true,
    data: (
      <img
        src={employeeData.company_logo || noPhoto}
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
    label: "Company Name",
    display: true,
    data: employeeData.company_name,
  },
  job_location_area: {
    align: "left",
    label: "Area",
    display: true,
    data: employeeData.job_location_area,
  },
  job_location_city: {
    align: "left",
    label: "City",
    display: true,
    data: employeeData.job_location_city,
  },
  experience: {
    align: "left",
    display: true,
    label: "Experience",
    data: employeeData.experience === 0 ? "0" : employeeData.total_jobs,
  },
  job_pay_minimum_salary: {
    align: "left",
    label: "Minimum Salary",
    display: true,
    data:
      employeeData.job_pay_minimum_salary === 0
        ? "0"
        : employeeData.job_pay_minimum_salary,
  },
  job_pay_maximum_salary: {
    align: "left",
    label: "Maximum Salary",
    display: true,
    data:
      employeeData.job_pay_maximum_salary === 0
        ? "0"
        : employeeData.job_pay_maximum_salary,
  },
  status: {
    align: "left",
    label: "Status",
    display: true,
    data: employeeData.status,
  },
  created_datetime: {
    align: "left",
    label: "Created At",
    display: true,
    data:
      employeeData.created_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.created_datetime))
        : "-",
  },
  updated_datetime: {
    align: "left",
    label: "Updated At",
    display: true,
    data:
      employeeData.updated_datetime !== null
        ? getCurrentDateTime(new Date(employeeData.updated_datetime))
        : "-",
  },
  actions: {
    hide: true,
  },
});

const EmployeeTableConfig = {
  getFormattedData,
  columns,
  getFormattedTotalJobs,
  totalJobs,
  getFormattedSuccessJobs,
  successJobs,
};

export default EmployeeTableConfig;
