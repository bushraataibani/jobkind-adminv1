import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import noPhoto from "../../../../../../../../assets/no-photo.webp";
import AssignJobConfirmationModal from "./AssignJobConfirmationModal";
import { shallowEqual, useSelector } from "react-redux";

const AppliedJobProfileMiddleView = ({ jobApplyEmployee }) => {
  const { activeJobData } = useSelector(
    (state) => ({
      activeJobData: state.appliedJob.activeJobData,
    }),
    shallowEqual
  );

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userJobApplyId, setUserJobApplyId] = useState("");

  const handleClick = () => {
    setShowConfirmationModal(true);
    setUserJobApplyId(activeJobData?.user_job_apply_id);
  };

  return (
    <>
      <Card
        style={{
          "&:hover": {
            opacity: 1,
          },
          backgroundColor: "#f9f8f8",
          boxShadow: "2px 5px 7px 0.3px #d9dade",
          overflow: "auto",
          margin: "10px 10px 15px",
        }}
      >
        <CardContent style={{ padding: "0px 16px" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              gap: "20px",
              padding: "10px 0px",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <AvatarGroup
                max={3}
                sx={{
                  "& .MuiAvatar-root": {
                    width: 50,
                    height: 50,
                    fontSize: 9,
                    backgroundColor: "gray",
                  },
                }}
              >
                <Avatar alt={noPhoto} />
              </AvatarGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                flexWrap: "wrap",
              }}
            >
              {activeJobData?.company_name && (
                <Typography variant="h6" style={{ fontWeight: "500" }}>
                  {activeJobData?.company_name || "-"}
                </Typography>
              )}

              {activeJobData?.job_title && (
                <Typography variant="h7" style={{ fontWeight: "400" }}>
                  {activeJobData?.job_title || "-"}
                </Typography>
              )}

              {jobApplyEmployee?.job_location?.company_address && (
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "400",
                    color: "#686868",
                    fontSize: "12px",
                  }}
                >
                  {jobApplyEmployee?.job_location?.company_address || "-"}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                justifyContent: "left",
                width: "100%",
              }}
            >
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#bdf4c9",
                  borderRadius: "10px",
                  textAlign: "center",
                  minWidth: "130px",
                  width: "auto",
                }}
              >
                <Box>Salary</Box>
                <Box style={{ fontWeight: 600 }}>
                  <CurrencyRupeeIcon />{" "}
                  {jobApplyEmployee?.job_pay?.minimum_salary} -{" "}
                  {jobApplyEmployee?.job_pay?.maximum_salary}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#bae5f4",
                  borderRadius: "10px",
                  textAlign: "center",
                  minWidth: "103px",
                  width: "auto",
                }}
              >
                <Box>Pay Type</Box>
                <Box style={{ fontWeight: 600 }}>
                  {jobApplyEmployee?.job_pay?.pay_type}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#fed0ab",
                  borderRadius: "10px",
                  textAlign: "center",
                  minWidth: "103px",
                  width: "auto",
                }}
              >
                <Box>Job Type</Box>
                <Box style={{ fontWeight: 600 }}>
                  {jobApplyEmployee?.job_type}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#ceccff",
                  borderRadius: "10px",
                  textAlign: "center",
                  minWidth: "103px",
                  width: "auto",
                }}
              >
                <Box>English</Box>
                <Box style={{ fontWeight: 600 }}>
                  {jobApplyEmployee?.english_level}
                </Box>
              </Box>
            </Box>
            <Box>
              <h4>Job Description</h4>
              <p>{jobApplyEmployee?.job_description}</p>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                onClick={() => handleClick()}
                className="d-flex align-items-center"
                style={{
                  whiteSpace: "nowrap",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <span style={{ textAlign: "center", width: "100%" }}>
                  Assign Job
                </span>
              </Button>
            </Box>
          </span>
        </CardContent>
      </Card>

      {showConfirmationModal && (
        <AssignJobConfirmationModal
          userJobApplyId={userJobApplyId}
          showConfirmationModal={showConfirmationModal}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}
    </>
  );
};

export default AppliedJobProfileMiddleView;
