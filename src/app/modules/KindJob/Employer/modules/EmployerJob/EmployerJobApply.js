import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerTableConfig from "../../EmployerTableConfig";

const EmployerJobApply = () => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const history = useHistory();

  const {
    allEmployerApplyJob,
    empJobPage,
    empJobDataPerPage,
    empJobDataCount,
    employerJobDetails,
    userId,
  } = useSelector(
    (state) => ({
      allEmployerApplyJob: state.employer.allEmployerApplyJob,
      empJobPage: state.employer.empJobPage,
      empJobDataPerPage: state.employer.empJobDataPerPage,
      empJobDataCount: state.employer.empJobDataCount,
      employerJobDetails: state.employer.employerJobDetails,
      userId: state.employer.userId,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allEmployerApplyJob?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerApplyJob(job, i)
    );

    setRowData(data);
  }, [allEmployerApplyJob]);

  return (
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
        <Col sm={7} md={7}>
          <h4 style={{ display: "flex", gap: "5px" }}>
            <Box
              onClick={() => {
                history.push(`/employer/${userId}/job`);
                dispatch(actions.setShowEmployerJobDetailsList(false));
                dispatch(actions.setShowEmployerJobList(true));
              }}
              sx={{
                padding: "0px 10px",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
            </Box>
            Job Details
          </h4>
          <div
            style={{
              display: "flex",
              backgroundColor: "#f1f3f4",
              padding: "20px",
              marginBottom: "20px",
              // height: "320px",
              // overflow: "auto",
            }}
          >
            <Col sm={12} md={12}>
              {employerJobDetails !== null &&
              Object.keys(employerJobDetails).length > 0 ? (
                <Row>
                  {/* Job, job type,deparment, role, */}
                  <Col sm={3} md={3}>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Title</Box>
                      <Box>{employerJobDetails?.job_title}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Job type</Box>
                      <Box>{employerJobDetails?.job_type}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Department</Box>
                      <Box>{employerJobDetails?.department_name}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Role</Box>
                      <Box>{employerJobDetails?.role_title}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Age Criteria</Box>
                      <Box>{`${employerJobDetails?.job_age_criterium?.maximum_age} - ${employerJobDetails?.job_age_criterium?.minimum_age}`}</Box>
                    </Box>
                  </Col>

                  {/* Company */}
                  <Col sm={3} md={3}>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Company Name</Box>
                      <Box>
                        {employerJobDetails?.user_company?.company_name}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Website</Box>
                      <Box>
                        {employerJobDetails?.user_company?.company_website_url}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Industry</Box>
                      <Box>
                        {employerJobDetails?.user_company?.industries_id}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>No. of Employees</Box>
                      <Box>
                        {" "}
                        {employerJobDetails?.user_company?.no_of_employee}
                      </Box>
                    </Box>
                    {/* <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Name</Box>
                    <Box>
                      {
                        employerJobDetails?.job_interviewer_detail
                          ?.recruiter_name
                      }
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>E-mail</Box>
                    <Box>
                      {
                        employerJobDetails?.job_interviewer_detail
                          ?.contact_email
                      }
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Whatsapp Number</Box>
                    <Box>
                      {
                        employerJobDetails?.job_interviewer_detail
                          ?.hr_hatsapp_number
                      }
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Address</Box>
                    <Box>{`${employerJobDetails?.job_interview_location?.address}`}</Box>
                  </Box> */}

                    {/* <Box>{`${employerJobDetails?.job_interview_location?.address}, ${employerJobDetails?.job_location?.city_name}, ${employerJobDetails?.job_location?.area_name}`}</Box> */}

                    {/* <Box
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <Box sx={{ fontWeight: 500 }}>Department</Box>
                    <Box>{`${employerJobDetails?.job_location?.company_address}, ${employerJobDetails?.job_location?.city_name}, ${employerJobDetails?.job_location?.area_name}`}</Box>

                    <Box sx={{ fontWeight: 500 }}>Industry</Box>
                    <Box>{employerJobDetails?.job_location?.location_type}</Box>
                  </Box> */}
                  </Col>

                  <Col sm={3} md={3}>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Skill</Box>
                      {employerJobDetails?.skills_data?.map((data, index) => (
                        <Box key={index}>- {data}</Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Education</Box>
                      <Box>{employerJobDetails?.education_title}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Degree</Box>
                      {employerJobDetails?.degree_data?.map((data, index) => (
                        <Box key={index}>- {data}</Box>
                      ))}
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>English</Box>
                      <Box> {employerJobDetails?.english_level}</Box>
                    </Box>
                  </Col>

                  <Col sm={3} md={3}>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Address</Box>
                      <Box>{`${employerJobDetails?.job_location?.company_address}, ${employerJobDetails?.job_location?.city_name}, ${employerJobDetails?.job_location?.area_name}`}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Location Type</Box>
                      <Box>
                        {employerJobDetails?.job_location?.location_type}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Salary</Box>
                      <Box>{`${employerJobDetails?.job_pay?.maximum_salary} - ${employerJobDetails?.job_pay?.minimum_salary}`}</Box>
                    </Box>
                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Pay Type</Box>
                      <Box>{employerJobDetails?.job_pay?.pay_type}</Box>
                    </Box>

                    <Box
                      sx={{
                        paddingBottom: "10px",
                      }}
                    >
                      <Box sx={{ fontWeight: 500 }}>Incentive</Box>
                      <Box>{employerJobDetails?.job_pay?.incentive}</Box>
                    </Box>
                  </Col>
                </Row>
              ) : (
                <div>No Data Found</div>
              )}
            </Col>
          </div>
        </Col>
        <Col sm={5} md={5}>
          <h4>Employeer Job Apply Employee List</h4>
          <TableCustom
            page={empJobPage}
            dataCount={empJobDataCount}
            dataPerPage={empJobDataPerPage}
            rowData={rowData !== undefined ? rowData : []}
            columnsConfig={EmployerTableConfig?.employerApplyJobColumns}
            numCols={EmployerTableConfig?.employerApplyJobColumns?.length}
            showPagination={true}
            showViewButton={false}
            showDeleteButton={false}
            deleteAction={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setEmpJobPageConfigData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setEmpJobPageConfigData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setEmpJobPageConfigData({ type: "SET_PAGE", data: 0 })
              );
            }}
          />
        </Col>
      </Box>
    </Paper>
  );
};

export default EmployerJobApply;
