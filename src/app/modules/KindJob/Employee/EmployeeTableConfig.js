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

const getFormattedData = (employeeData, index, clickableFunc) => ({
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
    align: "left",
    display: true,
    label: "Total Jobs",
    data: employeeData.total_jobs === 0 ? "0" : employeeData.total_jobs,
    clickable: true,
    ClickableAction: clickableFunc(),
  },
  total_success_job: {
    align: "left",
    label: "Success Job",
    display: true,
    data:
      employeeData.total_success_job === 0
        ? "0"
        : employeeData.total_success_job,
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
};

export default EmployeeTableConfig;
