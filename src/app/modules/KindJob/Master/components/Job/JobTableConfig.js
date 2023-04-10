import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React from "react";
import TableCellExpandList from "../../../../Helpers/Table/TableCellExpandList";
import { getCurrentDateTime } from "../../../../Utils/utils";

const columns = [
  {
    id: "job_id",
    label: "Job Id",
    align: "left",
    sort: true,
  },
  {
    id: "title",
    label: "Job Name",
    align: "left",
    sort: false,
  },
  {
    id: "job_departments",
    label: "Job Departments",
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

const getFormattedData = (jobData) => {
  const jobs = jobData.job_departments?.map((item) => item?.department);
  const jobDatas = jobData.job_departments?.map((item) => item);

  return {
    id: {
      display: false,
      label: "Job id",
      data: jobData.job_id,
    },
    job_id: {
      align: "left",
      display: true,
      label: "Job Id",
      data: jobData.job_id,
    },
    title: {
      align: "left",
      label: "Job Name",
      display: true,
      data: jobData.title,
    },
    job_departments: {
      align: "left",
      label: "Job Department",
      display: true,
      data: (
        <TableCellExpandList
          list={jobs || "-"}
          minItemsToShow={2}
          renderItem={(job) => (
            <div key={job?.role_id}>
              {jobs?.length === 0 ? "-" : job?.department_name}
            </div>
          )}
          containerStyles={{ maxHeight: "300px", overflow: "auto" }}
        />
      ),
      dataObj: jobDatas?.map((d) => ({
        label: d?.department?.department_name,
        value: d?.department?.department_id,
        job_department_id: d?.job_department_id,
      })),
    },
    created_datetime: {
      align: "left",
      label: "Created At",
      display: true,
      data:
        jobData.created_datetime !== null
          ? getCurrentDateTime(new Date(jobData.created_datetime))
          : "-",
    },
    updated_datetime: {
      align: "left",
      label: "Updated At",
      display: true,
      data:
        jobData.updated_datetime !== null
          ? getCurrentDateTime(new Date(jobData.updated_datetime))
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
              jobData.is_active === 1
                ? "rgb(1, 171, 52, 20%)"
                : "rgb(216, 17, 17, 20%)",
            color:
              jobData.is_active === 1
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
          {jobData.is_active === 1 ? "Active" : "Inactive"}
        </Box>
      ),
      dataIs: jobData.is_active === 1 ? true : false,
    },
  };
};

const JobTableConfig = {
  getFormattedData,
  columns,
};

export default JobTableConfig;
