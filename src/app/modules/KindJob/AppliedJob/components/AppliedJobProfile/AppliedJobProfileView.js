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
            <AppliedJobProfileMiddleView />
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
