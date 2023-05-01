import { Box, Paper } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import noPhoto from "../../../../../../assets/no-photo.webp";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import {
  getAllAppliedJobList,
  getEmployerJobDetails,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../EmployerRoute";
import EmployerTableConfig from "../../EmployerTableConfig";

const EmployerJob = () => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);
  const history = useHistory();

  const {
    allEmployerJob,
    allEmpProfile,
    empPage,
    empDataPerPage,
    empDataCount,

    empJobPage,
    empJobDataPerPage,
  } = useSelector(
    (state) => ({
      allEmployerJob: state.employer.allEmployerJob,
      allEmpProfile: state.employer.allEmpProfile,
      showEmployerJobList: state.employer.showEmployerJobList,
      empPage: state.employer.empPage,
      empDataPerPage: state.employer.empDataPerPage,
      empDataCount: state.employer.empDataCount,

      empJobPage: state.employer.empJobPage,
      empJobDataPerPage: state.employer.empJobDataPerPage,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allEmployerJob?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerJob(job, i)
    );

    setRowData(data);
  }, [allEmployerJob]);

  const getEmployerApplyJobEmployee = (main_job_id) => {
    dispatch(actions.setLoading(true));
    getAllAppliedJobList({
      search: "",
      page_no: empJobPage,
      page_record: empJobDataPerPage,
      main_job_id: main_job_id,
    })
      .then((res) => {
        dispatch(
          actions.setAllEmployerApplyJob(
            res?.data?.data?.employee_job_list_data?.rows
          )
        );
        dispatch(
          actions.setEmpJobPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_job_list_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setEmpJobPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const getEmployerJobDetailsList = (id) => {
    dispatch(actions.setLoading(true));
    getEmployerJobDetails(id)
      .then((res) => {
        dispatch(actions.setEmployerJobDetails(res?.data?.data?.job_data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
        dispatch(
          actions.setEmpJobPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const handleJobListView = (row) => {
    dispatch(actions.employerFetched(row));
    dispatch(actions.setShowEmployerJobList(false));
    dispatch(actions.setShowEmployerJobDetailsList(true));
    context.employerJobApplyEmployee(
      parseInt(row?.user_id?.data),
      parseInt(row?.id?.data)
    );
    getEmployerApplyJobEmployee(row?.id?.data);
    getEmployerJobDetailsList(parseInt(row?.user_id?.data));
    dispatch(actions.setUserId(parseInt(row?.user_id?.data)));
  };

  return (
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
        <Col sm={9} md={9}>
          <h4 style={{ display: "flex", gap: "5px" }}>
            <Box
              onClick={() => {
                history.push("/employer");
                dispatch(actions.setShowEmployerJobList(false));
              }}
              sx={{
                padding: "0px 10px",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
            >
              <i className="fas fa-arrow-left" style={{ color: "#000" }}></i>
            </Box>
            Employee Job List
          </h4>
          <TableCustom
            page={empPage}
            dataCount={empDataCount}
            dataPerPage={empDataPerPage}
            rowData={rowData !== undefined ? rowData : []}
            columnsConfig={EmployerTableConfig?.employerJobColumns}
            numCols={EmployerTableConfig?.employerJobColumns?.length}
            showPagination={true}
            showViewButton={true}
            showDeleteButton={false}
            viewAction={(row) => handleJobListView(row)}
            deleteAction={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setEmpPageConfigData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setEmpPageConfigData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setEmpPageConfigData({ type: "SET_PAGE", data: 0 })
              );
            }}
          />
        </Col>
        <Col sm={3} md={3}>
          <h4>Employee Info</h4>
          <Box
            sx={{
              backgroundColor: "#f1f3f4",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img
                src={allEmpProfile?.user_data?.profile_image || noPhoto}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = `${noPhoto}`;
                }}
                style={{
                  objectFit: "contain",
                  width: "auto",
                  height: "auto",
                  maxWidth: "100px",
                  maxHeight: "100px",
                }}
                alt="no_image"
              />
              <Box>
                <Box>
                  {allEmpProfile.user_data?.first_name}{" "}
                  {allEmpProfile.user_data?.last_name}
                </Box>
                <Box>{allEmpProfile.user_data?.email}</Box>
                <Box>{allEmpProfile.user_data?.phone_number}</Box>
              </Box>
            </Box>
          </Box>
          <h4>Company Info</h4>
          <Box
            sx={{
              backgroundColor: "#f1f3f4",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <Box>
              <Box>
                <strong>Name: </strong>
                {allEmpProfile.user_data?.user_company?.company_name}
              </Box>
              <Box>
                <strong>Industry: </strong>
                {allEmpProfile.user_data?.user_company?.industries_id}
              </Box>
              <Box>
                <strong>Website: </strong>
                {allEmpProfile.user_data?.user_company?.company_website_url}
              </Box>
              <Box>
                <strong>No. of Employee: </strong>
                {allEmpProfile.user_data?.user_company?.no_of_employee}
              </Box>
            </Box>
          </Box>
          <h4>Client Info</h4>
          <Box
            sx={{
              backgroundColor: "#f1f3f4",
              padding: "10px",
            }}
          >
            <Box>
              <Box>
                <strong>Name: </strong>
                {allEmpProfile.user_data?.user_company?.company_name}
              </Box>
              <Box>
                <strong>Industry: </strong>
                {allEmpProfile.user_data?.user_company?.industries_id}
              </Box>
              <Box>
                <strong>Website: </strong>
                {allEmpProfile.user_data?.user_company?.company_website_url}
              </Box>
              <Box>
                <strong>No. of Employee: </strong>
                {allEmpProfile.user_data?.user_company?.no_of_employee}
              </Box>
            </Box>
          </Box>
        </Col>
      </Box>
    </Paper>
  );
};

export default EmployerJob;
