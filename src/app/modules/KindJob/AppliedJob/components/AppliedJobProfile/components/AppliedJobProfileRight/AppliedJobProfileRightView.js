import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import noPhoto from "../../../../../../../../assets/no-photo.webp";

// {

//   "user_education_data": [
//       {
//           "user_education_id": 9,
//           "education_id": 4,
//           "education_type": "Full time",
//           "completion_expected_date": "2001-03-18T00:00:00.000Z",
//           "degree_id": 1,
//           "specialization_id": 2,
//           "collage_id": 2,
//           "collage_name": "Veer Nermad South Gujarat Univercit1y",
//           "education_title": "ITI",
//           "degree_title": "BBA",
//           "specialization_title": "International Business"
//       }
//   ],
//   "user_work_experiance_data": [
//       {
//           "user_workexperiance_id": 11,
//           "work_experience": "0",
//           "total_year_experiance": "0",
//           "total_month_experiance": "0",
//           "job_title_id": 0,
//           "job_title": "Software Engineer mca",
//           "department_id": 4,
//           "department_name": "Banking / Insurance / Financial Services",
//           "company_name": "sagar",
//           "industry_id": 1,
//           "is_working": 1,
//           "current_salary": "33333",
//           "employment_type_id": 1,
//           "notice_period_id": 1,
//           "start_date": "2017-03-18T00:00:00.000Z",
//           "end_date": null,
//           "department_title": "Banking / Insurance / Financial Services",
//           "industry_title": "Biotech and Life sciences",
//           "employment_type": "",
//           "notice_period": "No notice period"
//       }
//   ]

// }
const AppliedJobProfileRightView = ({ employedApplyJobProfile }) => {
  return (
    <>
      <Grid
        overflow="auto"
        container
        spacing={2}
        style={{ padding: "10px 10px 15px 10px" }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                  justifyContent: "center",
                  gap: "10px",
                  padding: "10px 0px",
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <AvatarGroup
                    max={3}
                    sx={{
                      "& .MuiAvatar-root": {
                        width: 80,
                        height: 80,
                        fontSize: 9,
                        backgroundColor: "gray",
                      },
                    }}
                  >
                    <Avatar
                      alt={noPhoto}
                      src={employedApplyJobProfile?.user_data?.profile_image}
                    />
                  </AvatarGroup>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {(employedApplyJobProfile?.user_data?.first_name ||
                    employedApplyJobProfile?.user_data?.last_name) && (
                    <Typography variant="h6" style={{ fontWeight: "500" }}>
                      {employedApplyJobProfile?.user_data?.first_name}{" "}
                      {employedApplyJobProfile?.user_data?.last_name}
                    </Typography>
                  )}

                  {employedApplyJobProfile?.user_data?.email && (
                    <Typography variant="h7" style={{ fontWeight: "400" }}>
                      {employedApplyJobProfile?.user_data?.email || "-"}
                    </Typography>
                  )}

                  {/* {employedApplyJobProfile?.user_data?.dob && (
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "400",
                    color: "#686868",
                    fontSize: "12px",
                  }}
                >
                  {employedApplyJobProfile?.user_data?.dob}
                </Typography>
              )} */}
                  {employedApplyJobProfile?.user_data?.address && (
                    <Typography
                      variant="h7"
                      style={{
                        fontWeight: "400",
                        color: "#686868",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      {employedApplyJobProfile?.user_data?.address}
                    </Typography>
                  )}
                </Box>
              </span>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  gap: "10px",
                  padding: "10px 0px",
                  flexWrap: "wrap",
                }}
              >
                <h4>Employee Preferences</h4>
                <Box>
                  <div>Skills</div>
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
                    {employedApplyJobProfile?.user_preference_data?.skills &&
                      employedApplyJobProfile?.user_preference_data?.skills
                        .length > 0 &&
                      employedApplyJobProfile?.user_preference_data?.skills?.map(
                        (item, index) => (
                          <>
                            <Typography
                              key={index}
                              variant="h5"
                              style={{ fontWeight: "600" }}
                            >
                              <Chip label={item || "-"} />
                            </Typography>
                          </>
                        )
                      )}
                  </span>
                </Box>
                <Box>
                  <div>Employement Type</div>
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
                    {employedApplyJobProfile?.user_preference_data
                      ?.preferred_employment_type &&
                      employedApplyJobProfile?.user_preference_data
                        ?.preferred_employment_type.length > 0 &&
                      employedApplyJobProfile?.user_preference_data?.preferred_employment_type?.map(
                        (item, index) => (
                          <>
                            <Typography
                              key={index}
                              variant="h5"
                              style={{ fontWeight: "600" }}
                            >
                              <Chip label={item || "-"} />
                            </Typography>
                          </>
                        )
                      )}
                  </span>
                </Box>
                <Box>
                  <div>Work Place</div>
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
                    {employedApplyJobProfile?.user_preference_data
                      ?.preferred_work_place &&
                      employedApplyJobProfile?.user_preference_data
                        ?.preferred_work_place.length > 0 &&
                      employedApplyJobProfile?.user_preference_data?.preferred_work_place?.map(
                        (item, index) => (
                          <>
                            <Typography
                              key={index}
                              variant="h5"
                              style={{ fontWeight: "600" }}
                            >
                              <Chip label={item || "-"} />
                            </Typography>
                          </>
                        )
                      )}
                  </span>
                </Box>
                <Box>
                  <div>Work Place</div>
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
                    {employedApplyJobProfile?.user_preference_data
                      ?.preferred_shift &&
                      employedApplyJobProfile?.user_preference_data
                        ?.preferred_shift.length > 0 &&
                      employedApplyJobProfile?.user_preference_data?.preferred_shift?.map(
                        (item, index) => (
                          <>
                            <Typography
                              key={index}
                              variant="h5"
                              style={{ fontWeight: "600" }}
                            >
                              <Chip label={item || "-"} />
                            </Typography>
                          </>
                        )
                      )}
                  </span>
                </Box>
                <Box>
                  <div>Language</div>
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
                    {employedApplyJobProfile?.user_preference_data?.language &&
                      employedApplyJobProfile?.user_preference_data?.language
                        .length > 0 &&
                      employedApplyJobProfile?.user_preference_data?.language?.map(
                        (item, index) => (
                          <>
                            <Typography
                              key={index}
                              variant="h5"
                              style={{ fontWeight: "600" }}
                            >
                              <Chip label={item || "-"} />
                            </Typography>
                          </>
                        )
                      )}
                  </span>
                </Box>
                <Box>
                  <div>Language</div>
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
                    {employedApplyJobProfile?.user_preference_data
                      ?.english_speaking_level && (
                      <Typography variant="h5" style={{ fontWeight: "600" }}>
                        {employedApplyJobProfile?.user_preference_data
                          ?.english_speaking_level?.title && (
                          <Chip
                            label={
                              employedApplyJobProfile?.user_preference_data
                                ?.english_speaking_level?.title || "-"
                            }
                          />
                        )}
                        {/* {employedApplyJobProfile?.user_preference_data
                          ?.english_speaking_level?.description && (
                          <p style={{ fontSize: "12px" }}>
                            {
                              employedApplyJobProfile?.user_preference_data
                                ?.english_speaking_level?.description
                            }
                          </p>
                        )} */}
                      </Typography>
                    )}
                  </span>
                </Box>
              </Box>
            </CardContent>
          </Card>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default AppliedJobProfileRightView;
