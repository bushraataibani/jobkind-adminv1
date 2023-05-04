import { Box, Paper } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import AppliedJobProfileLeftView from "./components/AppliedJobProfileLeft/AppliedJobProfileLeftView";
import AppliedJobProfileMiddleView from "./components/AppliedJobProfileMiddle/AppliedJobProfileMiddleView";
import AppliedJobProfileRightView from "./components/AppliedJobProfileRight/AppliedJobProfileRightView";

const AppliedJobProfileView = ({
  show,
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
    show && (
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0px",
          overflow: "auto",
        }}
      >
        <h4
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            onClick={() => onHide()}
            style={{
              padding: "0px 10px",
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
          </Box>
          Applied Jobs Profile
        </h4>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <Col xl={4} lg={4} md={12} sm={12}>
            <AppliedJobProfileLeftView
              allEmployeeAppliedJob={allEmployeeAppliedJob}
              onHide={onHide}
            />
          </Col>
          <Col xl={5} lg={5} md={12} sm={12}>
            <AppliedJobProfileMiddleView
              jobApplyEmployee={jobApplyEmployee}
              id={id}
              getAllData={getAllData}
              getAllEmployeeAppliedJobs={getAllEmployeeAppliedJobs}
              getJobProfileEmployeeAppliedJobs={
                getJobProfileEmployeeAppliedJobs
              }
              getJobApplyEmployeeProfileData={getJobApplyEmployeeProfileData}
            />
          </Col>
          <Col xl={3} lg={3} md={12} sm={12}>
            <AppliedJobProfileRightView
              employedApplyJobProfile={employedApplyJobProfile}
            />
          </Col>
        </Box>
      </Paper>
    )
  );
};

export default AppliedJobProfileView;
