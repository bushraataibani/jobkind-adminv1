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
import moment from "moment";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import noPhoto from "../../../../../../../../assets/no-photo.webp";
import noResult from "../../../../../../../../assets/noResut.svg";
import useWindowDimensions from "../../../../../../Utils/utils";
import { getEmployeeApplyJobProfile } from "../../../../../_redux/AppliedJob/AppliedJobCrud";
import { AppliedJobSlice } from "../../../../../_redux/AppliedJob/AppliedJobSlice";

const AppliedJobProfileLeftView = ({ allEmployeeAppliedJob }) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;
  const { height } = useWindowDimensions();

  const { activeJobIndex } = useSelector(
    (state) => ({
      activeJobIndex: state.appliedJob.activeJobIndex,
    }),
    shallowEqual
  );

  const getJobApplyEmployeeProfileData = (applyId) => {
    if (applyId) {
      dispatch(actions.setLoading(true));
      getEmployeeApplyJobProfile(applyId)
        .then((res) => {
          dispatch(actions.setJobApplyEmployee(res?.data?.data?.job_data));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  const handleClick = (item, index) => {
    dispatch(actions.setActiveJobIndex(index));
    dispatch(actions.setActiveJobData(item));
    getJobApplyEmployeeProfileData(item?.user_job_apply_id);
  };

  return (
    <>
      <Grid
        overflow="auto"
        container
        spacing={2}
        style={{
          padding: "10px 10px 15px 10px",
          maxHeight: `calc(${height}px - 80px)`,
          overflow: "auto",
        }}
      >
        {allEmployeeAppliedJob && allEmployeeAppliedJob.length > 0 ? (
          allEmployeeAppliedJob?.map((item, index) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} key={index}>
              <Card
                style={{
                  "&:hover": {
                    opacity: 1,
                  },
                  backgroundColor:
                    index === activeJobIndex ? "#d4d3ef5c" : "#f9f8f8",
                  boxShadow: "2px 5px 7px 0.3px #d9dade",
                  overflow: "auto",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(item, index)}
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
                          {item?.company_name}
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
                        label={`${item?.job_pay_minimum_salary ||
                          "10,000"} - ${item?.job_pay_maximum_salary ||
                          "20,000"}`}
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
                        {moment(
                          new Date(item?.created_datetime).toISOString(),
                          "YYYYMMDD"
                        ).fromNow() || "-"}
                      </Typography>
                    </CardActions>
                  </>
                )}
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    <img src={noResult} alt="noResult" width="50" height="50" />
                  </Box>
                  <Box
                    sx={{
                      fontSize: "20px",
                      fontWeight: 600,
                      lineHeight: "12px",
                    }}
                  >
                    No Jobs Available
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AppliedJobProfileLeftView;
