import { Box } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import AppliedJobProfileLeftView from "./components/AppliedJobProfileLeft/AppliedJobProfileLeftView";
import AppliedJobProfileMiddleView from "./components/AppliedJobProfileMiddle/AppliedJobProfileMiddleView";
import AppliedJobProfileRightView from "./components/AppliedJobProfileRight/AppliedJobProfileRightView";

const AppliedJobProfileView = ({
  onHide,
  allEmployeeAppliedJob,
  employedApplyJobProfile,
  jobApplyEmployee,
  id,
  getAllData,
  getAllEmployeeAppliedJobs,
  getJobProfileEmployeeAppliedJobs,
  getJobApplyEmployeeProfileData,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <Col xl={3} lg={3} md={4} sm={12}>
        <AppliedJobProfileLeftView
          allEmployeeAppliedJob={allEmployeeAppliedJob}
          onHide={onHide}
        />
      </Col>
      <Col xl={6} lg={6} md={4} sm={12}>
        <AppliedJobProfileMiddleView
          jobApplyEmployee={jobApplyEmployee}
          id={id}
          getAllData={getAllData}
          getAllEmployeeAppliedJobs={getAllEmployeeAppliedJobs}
          getJobProfileEmployeeAppliedJobs={getJobProfileEmployeeAppliedJobs}
          getJobApplyEmployeeProfileData={getJobApplyEmployeeProfileData}
        />
      </Col>
      <Col xl={3} lg={3} md={4} sm={12}>
        <AppliedJobProfileRightView
          employedApplyJobProfile={employedApplyJobProfile}
        />
      </Col>
    </Box>
  );
};

export default AppliedJobProfileView;
