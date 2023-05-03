import { Box } from "@mui/material";
import React from "react";
import noPhoto from "../../../../assets/no-photo.webp";
import { getCurrentDateTime } from "../../Utils/utils";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const columns = [
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
  {
    label: "Actions",
    align: "center",
    styles: { maxWidth: "100px", width: "100px" },
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
  name: {
    align: "left",
    label: "Name",
    display: true,
    data: `${employeeData.first_name} ${employeeData.last_name}`,
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
        alt="no_image"
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
    data: (
      <Box
        sx={{
          backgroundColor:
            employeeData.status === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            employeeData.status === 1
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
        {employeeData.status === 1 ? "Active" : "Inactive"}
      </Box>
    ),
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
    data: employeeData.experience === 0 ? "0" : employeeData.experience,
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
    data: (
      <Box
        sx={{
          backgroundColor:
            employeeData.status === 1
              ? "rgb(1, 171, 52, 20%)"
              : "rgb(216, 17, 17, 20%)",
          color:
            employeeData.status === 1
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
        {employeeData.status === 1 ? "Active" : "Inactive"}
      </Box>
    ),
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

const educationCol = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "collage_name",
    label: "College Name",
    align: "left",
    sort: false,
  },
  {
    id: "education_title",
    label: "Education",
    align: "left",
    sort: false,
  },
  {
    id: "degree_title",
    label: "Degree",
    align: "left",
    sort: false,
  },
  {
    id: "specialization_title",
    label: "Specialization",
    align: "left",
    sort: false,
  },
  {
    id: "education_type",
    label: "Education Type",
    align: "left",
    sort: false,
  },
  {
    id: "completion_expected_date",
    label: "Completion Date",
    align: "left",
    sort: false,
  },
];

const getFormattedEducation = (employeeData, index) => ({
  id: {
    display: false,
    label: "User Education id",
    data: employeeData.user_education_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  collage_name: {
    align: "left",
    label: "College Name",
    display: true,
    data: employeeData.collage_name,
  },
  education_title: {
    align: "left",
    label: "Education",
    display: true,
    data: employeeData.education_title,
  },
  degree_title: {
    align: "left",
    label: "Degree",
    display: true,
    data: employeeData.degree_title,
  },
  specialization_title: {
    align: "left",
    label: "Specialization",
    display: true,
    data: employeeData.specialization_title,
  },
  education_type: {
    align: "center",
    display: true,
    label: "Education Type",
    data: employeeData.education_type,
  },
  completion_expected_date: {
    align: "left",
    label: "Completion Date",
    display: true,
    data:
      employeeData.completion_expected_date !== null
        ? getCurrentDateTime(new Date(employeeData.completion_expected_date))
        : "-",
  },
  actions: {
    hide: true,
  },
});

const experienceCol = [
  {
    id: "sr_no",
    label: "Sr No",
    align: "left",
    sort: false,
  },
  {
    id: "job_title",
    label: "Job",
    align: "left",
    sort: false,
  },
  {
    id: "department_name",
    label: "Department",
    align: "left",
    sort: false,
  },
  {
    id: "industry_title",
    label: "Industry",
    align: "left",
    sort: false,
  },
  {
    id: "employment_type",
    label: "Employment Type",
    align: "left",
    sort: false,
  },
  {
    id: "company_name",
    label: "Company",
    align: "left",
    sort: false,
  },
  {
    id: "is_working",
    label: "Working?",
    align: "left",
    sort: false,
  },
  {
    id: "current_salary",
    label: "Current Salary",
    align: "left",
    sort: false,
  },
  {
    id: "work_experience",
    label: "Work Experience",
    align: "left",
    sort: false,
  },
  {
    id: "total_year_experiance",
    label: "Total Year Experience",
    align: "left",
    sort: false,
  },
  {
    id: "total_month_experiance",
    label: "Total Month Experience",
    align: "left",
    sort: false,
  },
  {
    id: "notice_period",
    label: "Notice Period",
    align: "left",
    sort: false,
  },
  {
    id: "start_date",
    label: "Start Date",
    align: "left",
    sort: false,
  },
  {
    id: "end_date",
    label: "End Date",
    align: "left",
    sort: false,
  },
];

const getFormattedExperience = (employeeData, index) => ({
  id: {
    display: false,
    label: "User Education id",
    data: employeeData.user_workexperiance_id,
  },
  sr_no: {
    align: "left",
    label: "Sr No",
    display: true,
    data: index + 1,
  },
  job_title: {
    align: "left",
    label: "Job",
    display: true,
    data: employeeData.job_title,
  },
  department_name: {
    align: "left",
    label: "Department",
    display: true,
    data: employeeData.department_name,
  },
  industry_title: {
    align: "left",
    label: "Industry",
    display: true,
    data: employeeData.industry_title,
  },
  employment_type: {
    align: "left",
    label: "Employment Type",
    display: true,
    data: employeeData.employment_type || "-",
  },
  company_name: {
    align: "center",
    display: true,
    label: "Company Name",
    data: employeeData.company_name,
  },
  is_working: {
    align: "center",
    display: true,
    label: "Working?",
    data: employeeData.is_working === 1 ? "Yes" : "No",
  },
  current_salary: {
    align: "center",
    display: true,
    label: "Current salary",
    data: employeeData.current_salary,
  },
  work_experience: {
    align: "center",
    display: true,
    label: "Work Experience",
    data: employeeData.work_experience,
  },
  total_year_experiance: {
    align: "center",
    display: true,
    label: "Total Year Experience",
    data: employeeData.total_year_experiance,
  },
  total_month_experiance: {
    align: "center",
    display: true,
    label: "Total Month Experience",
    data: employeeData.total_month_experiance,
  },
  notice_period: {
    align: "center",
    display: true,
    label: "Notice Period",
    data: employeeData.notice_period,
  },
  start_date: {
    align: "left",
    label: "Start Date",
    display: true,
    data:
      employeeData.start_date !== null
        ? getCurrentDateTime(new Date(employeeData.start_date))
        : "-",
  },
  end_date: {
    align: "left",
    label: "End Date",
    display: true,
    data:
      employeeData.end_date !== null
        ? getCurrentDateTime(new Date(employeeData.end_date))
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
  getFormattedEducation,
  educationCol,
  getFormattedExperience,
  experienceCol,
};

export default EmployeeTableConfig;
