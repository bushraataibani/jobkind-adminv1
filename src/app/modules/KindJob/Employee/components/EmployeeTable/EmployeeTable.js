import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";

import { EmployeeContext } from "../../EmployeeRoute";
import EmployeeTableConfig from "../../EmployeeTableConfig";
import TotalJobModal from "../TotalJobModal/TotalJobModal";
import {
  getAppliedJobs,
  getSuccessJobs,
} from "../../../_redux/Employee/EmployeeCrud";
import SuccessJobModal from "../SuccessJobModal/SuccessJobModal";

const EmployeeTable = ({ allEmployee, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const context = useContext(EmployeeContext);
  const [rowData, setRowData] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobRowData, setJobRowData] = useState([]);
  const [showSuccessJobModal, setShowSuccessJobModal] = useState(false);
  const [successRowData, setSuccessRowData] = useState([]);

  const {
    isLoading,
    filter,
    page,
    dataCount,
    dataPerPage,
    allJobs,
    allJobpage,
    allJobDataPerPage,
    allSuccessJobs,
    successpage,
    successDataPerPage,
  } = useSelector(
    (state) => ({
      isLoading: state.employee.isLoading,
      filter: state.employee.filter,
      page: state.employee.page,
      dataCount: state.employee.dataCount,
      dataPerPage: state.employee.dataPerPage,

      allJobs: state.employee.allJobs,
      allJobpage: state.employee.allJobpage,
      allJobDataPerPage: state.employee.allJobDataPerPage,

      allSuccessJobs: state.employee.allSuccessJobs,
      successpage: state.employee.successpage,
      successDataPerPage: state.employee.successDataPerPage,
    }),
    shallowEqual
  );

  const getAllAppliedJobs = (user_id) => {
    dispatch(actions.setLoading(true));
    getAppliedJobs({
      search: "",
      page_no: allJobpage,
      page_record: allJobDataPerPage,
      user_id: user_id,
    })
      .then((res) => {
        dispatch(actions.setAllJobs(res?.data?.data?.employee_job_data?.rows));
        dispatch(
          actions.setAllJobPageData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_job_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const getAllSuccessJobs = (user_id) => {
    dispatch(actions.setLoading(true));
    getSuccessJobs({
      search: "",
      page_no: successpage,
      page_record: successDataPerPage,
      user_id: user_id,
    })
      .then((res) => {
        dispatch(
          actions.setAllSuccessJobs(res?.data?.data?.employee_job_data?.rows)
        );
        dispatch(
          actions.setSuccessJobPageData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_job_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const handleTotalJob = (event, row) => {
    getAllAppliedJobs(row?.id?.data);
    setShowJobModal(true);
  };

  const handleTotalSuccessJob = (event, row) => {
    getAllSuccessJobs(row?.id?.data);
    setShowSuccessJobModal(true);
  };

  useEffect(() => {
    const data = allEmployee.map((employee, i) =>
      EmployeeTableConfig.getFormattedData(employee, i)
    );

    setRowData(data);
  }, [allEmployee]);

  useEffect(() => {
    const data = allJobs.map((job, i) =>
      EmployeeTableConfig.getFormattedTotalJobs(job, i)
    );

    setJobRowData(data);
  }, [allJobs]);

  useEffect(() => {
    const data = allSuccessJobs.map((job, i) =>
      EmployeeTableConfig.getFormattedSuccessJobs(job, i)
    );

    setSuccessRowData(data);
  }, [allSuccessJobs]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          background: "#f8f8f8",
        }}
      >
        <EnhancedTableToolbar
          title="Employee"
          showAdd={false}
          btnTitle="ADD"
          tooltipTitle="Add Role"
          btnHandler={() => context.addEmployee()}
          circularLoader={
            isLoading && (
              <Spinner animation="border" style={{ margin: "10px" }} />
            )
          }
          refreshHandler={() => getAllData()}
          showSearch={true}
          filter={filter}
          refreshWhenWholeFilterChange={true}
          searchConfig={{
            searchKeys: ["collage_id", "collage_name"],
            filterValue: filter?.search?.keyword || "",
            setSearchConfig: (data) => {
              dispatch(actions.setFilter(data));
              dispatch(
                actions.setPageConfigData({ type: "SET_PAGE", data: 0 })
              );
            },
          }}
        />
        <TableCustomServer
          page={page}
          dataCount={dataCount}
          dataPerPage={dataPerPage}
          rowData={rowData}
          columnsConfig={EmployeeTableConfig.columns}
          numCols={EmployeeTableConfig.columns.length}
          clickableEvent={(e, row) => handleTotalJob(e, row)}
          clickAction={(e, row) => handleTotalSuccessJob(e, row)}
          showPagination={true}
          showViewButton={false}
          showDeleteButton={false}
          handleSetPage={(newPage) => {
            dispatch(
              actions.setPageConfigData({
                type: "SET_PAGE",
                data: newPage,
              })
            );
          }}
          handleNoOfRowsPerPage={(value) => {
            dispatch(
              actions.setPageConfigData({
                type: "SET_DATA_PER_PAGE",
                data: parseInt(value, 10),
              })
            );
            dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 0 }));
          }}
        />
      </Box>
      {showJobModal && (
        <TotalJobModal
          showJobModal={showJobModal}
          setShowJobModal={setShowJobModal}
          jobRowData={jobRowData}
        />
      )}
      {showSuccessJobModal && (
        <SuccessJobModal
          showSuccessJobModal={showSuccessJobModal}
          setShowSuccessJobModal={setShowSuccessJobModal}
          successRowData={successRowData}
        />
      )}
    </>
  );
};

export default EmployeeTable;
