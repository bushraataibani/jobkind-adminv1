import { Box, Paper } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";

// [
//   {
//       "user_job_apply_id": 3,
//       "created_datetime": "2023-04-15T15:25:28.000Z",
//       "status": 0,
//       "updated_datetime": null,
//       "job_title": ".Net Developer",
//
//       "job_location_city": "Nashik",
//       "job_location_area": "Kalwan Tahsil",
//       "experience": 0,
//       "job_pay_minimum_salary": 0,
//       "job_pay_maximum_salary": 0
//   }
// ]

const AppliedJobProfileView = ({ show, onHide, allEmployeeAppliedJob }) => {
  return (
    show && (
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "0px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Col xl={4} lg={4} md={12} sm={12}>
            <h4 style={{ display: "flex", gap: "5px" }}>
              <Box
                onClick={() => onHide()}
                sx={{
                  padding: "0px 10px",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
              </Box>
            </h4>
            {allEmployeeAppliedJob?.map((item, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Box>{item?.company_logo}</Box>
                  <Box>{item?.company_name}</Box>
                  <Box>
                    {item?.job_pay_minimum_salary} -{" "}
                    {item?.job_pay_minimum_salary}
                  </Box>
                </Box>
              </Box>
            ))}
          </Col>
          <Col xl={4} lg={4} md={12} sm={12}>
            <h4>Job Details</h4>
          </Col>
          <Col xl={4} lg={4} md={12} sm={12}>
            <h4>Employee Details</h4>
          </Col>
        </Box>
      </Paper>
    )
  );
};

export default AppliedJobProfileView;
