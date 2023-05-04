import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SchoolIcon from "@mui/icons-material/School";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import noPhoto from "../../../../../../../../assets/no-photo.webp";

const AppliedJobProfileLeftView = ({ allEmployeeAppliedJob, onHide }) => {
  return (
    <>
      <h4 style={{ display: "flex", gap: "10px" }}>
        <Box
          onClick={() => onHide()}
          sx={{
            padding: "0px 10px",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
          <span> Employee Applied Jobs</span>
        </Box>
      </h4>
      <Grid
        overflow="auto"
        container
        spacing={2}
        style={{ padding: "10px 10px 15px 10px" }}
      >
        {allEmployeeAppliedJob && allEmployeeAppliedJob.length > 0 ? (
          allEmployeeAppliedJob?.map((item, index) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
              <Card
                style={{
                  "&:hover": {
                    opacity: 1,
                  },
                  backgroundColor: "#f9f8f8",
                  boxShadow: "2px 5px 7px 0.3px #d9dade",
                  overflow: "auto",
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
                        <Avatar alt={noPhoto} src={item?.company_logo} />
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
                      {item?.company_name && (
                        <Typography variant="h6" style={{ fontWeight: "500" }}>
                          {item?.company_name || "App Gambit"}
                        </Typography>
                      )}

                      {item?.job_title && (
                        <Typography variant="h7" style={{ fontWeight: "400" }}>
                          {item?.job_title || "-"}
                        </Typography>
                      )}

                      {(item?.job_location_city || item?.job_location_area) && (
                        <Typography
                          variant="h7"
                          style={{
                            fontWeight: "400",
                            color: "#686868",
                            fontSize: "12px",
                          }}
                        >
                          {item?.job_location_city &&
                            item?.job_location_city + ","}{" "}
                          {item?.job_location_area && item?.job_location_area}
                        </Typography>
                      )}
                    </Box>
                  </span>
                  <span
                    component="span"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-center",
                      gap: "20px",
                      padding: "10px 0px",
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="h5" style={{ fontWeight: "600" }}>
                      <Chip
                        icon={<CurrencyRupeeIcon />}
                        label={`${item?.job_pay_minimum_salary || "10,000"} -
          ${item?.job_pay_maximum_salary || "20,000"}`}
                      />
                    </Typography>
                    {item?.job_type && (
                      <>
                        <Typography variant="h5" style={{ fontWeight: "600" }}>
                          <Chip
                            icon={<WorkHistoryIcon />}
                            label={item?.job_type || "-"}
                          />
                        </Typography>
                      </>
                    )}
                    {item?.experience && (
                      <>
                        <Typography variant="h5" style={{ fontWeight: "600" }}>
                          <Chip
                            icon={<SchoolIcon />}
                            label={item?.experience || "-"}
                          />
                        </Typography>
                      </>
                    )}
                  </span>
                </CardContent>

                {item?.created_datetime && (
                  <>
                    <Divider />
                    <CardActions
                      style={{
                        justifyContent: "flex-end",
                        padding: "10px 16px",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography
                        variant="h7"
                        style={{
                          fontWeight: "400",
                          color: "#686868",
                          fontSize: "12px",
                        }}
                      >
                        {item?.created_datetime}
                      </Typography>
                    </CardActions>
                  </>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Card
            style={{
              "&:hover": {
                opacity: 1,
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 500,
              fontSize: "1.1rem",
              textAlign: "center",
              height: "250px",
              padding: "6px",
              boxShadow: "2px 5px 7px 0.3px #d9dade",
              color: "#444444",
            }}
          >
            <CardContent style={{ padding: "0px 16px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <img
                    // src={noResult}
                    alt="noResult"
                    width="50"
                    height="50"
                  />
                </Box>
                <Box
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "12px",
                  }}
                >
                  No Roles Data Available
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
      </Grid>
    </>
  );
};

export default AppliedJobProfileLeftView;
