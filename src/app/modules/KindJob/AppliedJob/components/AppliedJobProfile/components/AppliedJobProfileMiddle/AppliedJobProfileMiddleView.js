import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import noPhoto from "../../../../../../../../assets/no-photo.webp";

const AppliedJobProfileMiddleView = () => {
  let appliedJobDetails = {
    is_compnay: 1,
    job_id: 0,
    job_title: "0",
    department_id: 1,
    role_id: 1,
    job_type_id: 1,
    is_night_shift_job: 1,
    additional_perks_id: "",
    other_additional_perks: [],
    is_joining_fee_deposit_required: 1,
    education: 1,
    degree: [1, 2],
    gender: 3,
    age_criteria: 1,
    english_level: "Basic",
    skills: [],
    asset: [],
    job_description: "My Own Job",
    interviewer: 1,
    interview_type: 1,
    interview_location_type: 0,
    manage_job: 1,
    job_pay: {
      job_pay_id: 2,
      main_job_id: 2,
      pay_type: "Fixed only",
      minimum_salary: 7000,
      maximum_salary: 10000,
      incentive: 0,
      created_datetime: "2023-04-15T08:44:12.000Z",
      updated_datetime: null,
      is_deleted: 0,
    },
    job_location: {
      job_location_id: 2,
      main_job_id: 2,
      location_type: "Work From Office",
      city_id: 1,
      area_id: 1,
      company_address: "Surat",
      receive_applications_from: 3,
      applications_from_india: 0,
      field_job_for: 0,
      created_datetime: "2023-04-15T08:44:06.000Z",
      updated_datetime: null,
      is_deleted: 0,
      city_name: "Surat",
      area_name: "Ring Road",
    },
    job_joining_fee: {
      job_joining_fee_id: 2,
      main_job_id: 2,
      fee_amount: 3000,
      joining_fee_type_id: 3,
      extra: "Test",
      fee_be_paid: 3,
      created_datetime: "2023-04-15T08:44:18.000Z",
      updated_datetime: null,
      is_deleted: 0,
    },
    job_age_criterium: {
      job_age_criteria_id: 2,
      main_job_id: 2,
      minimum_age: 24,
      maximum_age: 32,
      created_datetime: "2023-04-15T08:44:28.000Z",
      updated_datetime: null,
      is_deleted: 0,
    },
    job_experience: null,
    job_interviewer_detail: null,
    job_interview_location: null,
    user_company: null,
    department_name: "Admin / Back Office / Computer Operator",
    role_title: "Admin",
    job_type: "Full time",
    additional_perks: [],
    education_title: "10th or Below 10th",
    degree_data: ["BBA", "BCA"],
    skills_data: [],
    asset_data: [],
  };

  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {};

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
              {/* {item?.company_name && ( */}
              <Typography variant="h6" style={{ fontWeight: "500" }}>
                {"App Gambit"}
              </Typography>
              {/* )} */}

              {/* {item?.job_title && ( */}
              <Typography variant="h7" style={{ fontWeight: "400" }}>
                {".Net Developer" || "-"}
              </Typography>
              {/* )} */}

              {appliedJobDetails?.job_location?.company_address && (
                <Typography
                  variant="h7"
                  style={{
                    fontWeight: "400",
                    color: "#686868",
                    fontSize: "12px",
                  }}
                >
                  {appliedJobDetails?.job_location?.company_address || "-"}
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
              }}
            >
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#bdf4c9",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "130px",
                }}
              >
                <Box>Salary</Box>
                <Box style={{ fontWeight: 600 }}>
                  <CurrencyRupeeIcon />{" "}
                  {appliedJobDetails?.job_pay?.minimum_salary} -{" "}
                  {appliedJobDetails?.job_pay?.maximum_salary}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#bae5f4",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "103px",
                }}
              >
                <Box>Pay Type</Box>
                <Box style={{ fontWeight: 600 }}>
                  {appliedJobDetails?.job_pay?.pay_type}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#fed0ab",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "103px",
                }}
              >
                <Box>Job Type</Box>
                <Box style={{ fontWeight: 600 }}>
                  {appliedJobDetails?.job_type}
                </Box>
              </Box>
              <Box
                style={{
                  padding: "10px",
                  backgroundColor: "#ceccff",
                  borderRadius: "10px",
                  textAlign: "center",
                  width: "103px",
                }}
              >
                <Box>English</Box>
                <Box style={{ fontWeight: 600 }}>
                  {appliedJobDetails?.english_level}
                </Box>
              </Box>
            </Box>
            <Box>
              <h4>Job Description</h4>
              {/* <p>{appliedJobDetails?.job_description}</p> */}
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </p>
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
                onClick={handleSubmit}
                // disabled={isSubmitting}
                className="d-flex align-items-center"
                style={{
                  whiteSpace: "nowrap",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                {/* {isSubmitting && (
                  <CircularProgress
                    size={20}
                    thickness={3.3}
                    color="inherit"
                    className="mr-1"
                  />
                )}

                <span style={{ textAlign: "center", width: "100%" }}>
                  {isSubmitting ? "Applying" : "Apply"}
                </span> */}
              </Button>
            </Box>
          </span>
        </CardContent>
      </Card>
    </>
  );
};

export default AppliedJobProfileMiddleView;
