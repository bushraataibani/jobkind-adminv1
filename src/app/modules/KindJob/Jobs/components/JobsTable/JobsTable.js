import PersonIcon from "@mui/icons-material/Person";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { JobsContext } from "../../JobsRoute";
import JobsTableConfig from "../../JobsTableConfig";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import JobsDescription from "../JobsDescription/JobsDescription";
import UserDetails from "../UserDetails/UserDetails";

const JobsTable = ({ allJobs, getAllData, allEmployee }) => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;
  const context = useContext(JobsContext);

  const [rowData, setRowData] = useState([]);
  const [showDescModal, setShowDescModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [empRowData, setEmpRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.jobs.isLoading,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataCount: state.jobs.dataCount,
      dataPerPage: state.jobs.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allJobs.map((lang, i) =>
      JobsTableConfig.getFormattedData(lang, i)
    );

    setRowData(data);
  }, [allJobs]);

  useEffect(() => {
    const data = allEmployee.map((emp, i) =>
      JobsTableConfig.getFormattedEmpData(emp, i)
    );

    setEmpRowData(data);
  }, [allEmployee]);

  const renderBtn = (row) => {
    return (
      <>
        <Tooltip
          disableInteractive={true}
          arrow
          title="User"
          placement="bottom"
        >
          <IconButton
            aria-label="User"
            onClick={() => {
              setShowUserModal(true);
              setSelectedRow(row);
            }}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: "#242368",
            }}
          >
            <PersonIcon
              sx={{
                width: "1.6rem",
                height: "1.6rem",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Job List"
        showAdd={false}
        btnHandler={() => context.addJobs()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
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
            dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 0 }));
          },
        }}
        showExtraBtn={true}
        extraBtnHandler={() => setShowEmployeeModal(true)}
      />
      <TableCustomServer
        page={page}
        dataCount={dataCount}
        dataPerPage={dataPerPage}
        rowData={rowData}
        columnsConfig={JobsTableConfig.columns}
        numCols={JobsTableConfig.columns.length}
        clickAction={(e, row) => {
          setShowDescModal(true);
          setSelectedDesc(row);
        }}
        noDecor={true}
        noColor={true}
        showPagination={true}
        showViewButton={false}
        showDeleteButton={false}
        showExtraButton={true}
        renderExtraBtn={renderBtn}
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
      {showDescModal && (
        <JobsDescription
          showDescModal={showDescModal}
          selectedDesc={selectedDesc}
          setShowDescModal={setShowDescModal}
        />
      )}
      {showUserModal && (
        <UserDetails
          showUserModal={showUserModal}
          setShowUserModal={setShowUserModal}
          selectedRow={selectedRow}
        />
      )}
      {showEmployeeModal && (
        <EmployeeDetails
          showEmployeeModal={showEmployeeModal}
          setShowEmployeeModal={setShowEmployeeModal}
          empRowData={empRowData}
        />
      )}
    </Box>
  );
};

export default JobsTable;
