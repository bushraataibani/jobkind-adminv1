import { getCurrentDateTime } from "../../Utils/utils";

const columns = [
  {
    id: "sr_no",
    label: "Sr No",
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

const getFormattedData = (jobsData, index) => ({
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
  actions: {
    hide: true,
  },
});

const JobDetailTableConfig = {
  getFormattedData,
  columns,
};

export default JobDetailTableConfig;
