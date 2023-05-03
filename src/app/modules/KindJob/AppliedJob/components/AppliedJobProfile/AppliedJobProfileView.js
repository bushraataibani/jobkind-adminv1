import { Box, Chip, Paper } from "@mui/material";
import React from "react";
import { Col } from "react-bootstrap";
import noPhoto from "../../../../../../assets/no-photo.webp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SchoolIcon from "@mui/icons-material/School";

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
              <Box
                key={index}
                sx={{
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #f5f5f5",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Box>
                    <img
                      src={item.company_logo || noPhoto}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `${noPhoto}`;
                      }}
                      style={{
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                        maxWidth: "50px",
                        maxHeight: "50px",
                      }}
                      alt="no_image"
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <h5>{item?.company_name || "App Gambit"}</h5>
                    </Box>
                    <Box>
                      <h7>{item?.job_title}</h7>
                    </Box>
                  </Box>

                  {/* <Box>{item?.job_location_city}</Box>
                  <Box>{item?.job_location_area}</Box> */}
                </Box>
                <Box>
                  <Chip
                    icon={<CurrencyRupeeIcon />}
                    label={`${item?.job_pay_minimum_salary || "10,000"},
                    ${item?.job_pay_maximum_salary || "20,000"}`}
                  />
                  <Chip icon={<SchoolIcon />} label={item?.experience} />
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
