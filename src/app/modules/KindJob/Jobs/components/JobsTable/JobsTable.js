import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { JobsContext } from "../../JobsRoute";
import JobsTableConfig from "../../JobsTableConfig";
import CandidateDetails from "../CandidateDetails/CandidateDetails";
import CandidateExpireJob from "../CandidateExpireJob/CandidateExpireJob";
import JobsDescription from "../JobsDescription/JobsDescription";

export const dropdownColorStyles = {
  control: (styles) => ({
    ...styles,
    width: 180,
  }),
  menu: (styles) => ({
    ...styles,
    height: "auto",
    zIndex: 3,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
  }),
};

const JobsTable = ({
  allJobs,
  getAllData,
  allCandidate,
  allJobOption,
  allCityOption,
  setSelected,
  selected,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { actions } = jobsSlice;
  const context = useContext(JobsContext);

  const jobType = [
    { label: "Active Jobs", value: 1 },
    { label: "Expire Jobs", value: 2 },
  ];

  const [rowData, setRowData] = useState([]);
  const [showDescModal, setShowDescModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState({});

  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [candidateRowData, setCandidateRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});

  const [showExpireJobModal, setShowExpireJobModal] = useState(false);
  const [expireJobDetail, setExpireJobDetail] = useState({});

  const {
    isLoading,
    filter,
    page,
    dataCount,
    dataPerPage,
    jobTitle,
    jobStatus,
    city,
  } = useSelector(
    (state) => ({
      isLoading: state.jobs.isLoading,
      filter: state.jobs.filter,
      page: state.jobs.page,
      dataCount: state.jobs.dataCount,
      dataPerPage: state.jobs.dataPerPage,
      jobTitle: state.jobs.jobTitle,
      jobStatus: state.jobs.jobStatus,
      city: state.jobs.city,
    }),
    shallowEqual
  );

  const handleExpireJobList = (row) => {
    setShowExpireJobModal(true);
    setExpireJobDetail(row);
  };

  const handleAssignJobChange = (row) => {
    setShowCandidateModal(true);
    setSelectedRow(row);
  };

  const renderBtn = (row) => {
    return (
      <>
        <Tooltip
          disableInteractive={true}
          arrow
          title="Assign Job"
          placement="bottom"
        >
          <IconButton
            aria-label="Assign Job"
            onClick={() => handleAssignJobChange(row)}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: "#242368",
            }}
          >
            <AccountBoxIcon
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
        <Tooltip
          disableInteractive={true}
          arrow
          title="Expire Job"
          placement="bottom"
        >
          <IconButton
            aria-label="Expire Job"
            onClick={() => handleExpireJobList(row)}
            sx={{
              padding: "5px",
              borderRadius: "5px",
            }}
            style={{
              backgroundColor: theme.palette.error.main,
            }}
          >
            <RunningWithErrorsIcon
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

  useEffect(() => {
    const data = allJobs.map((job, i) =>
      JobsTableConfig.getFormattedData(job, i)
    );

    setRowData(data);
  }, [allJobs]);

  useEffect(() => {
    const data = allCandidate.map((cand, i) =>
      JobsTableConfig.getFormattedEmpData(cand, i)
    );

    setCandidateRowData(data);
  }, [allCandidate]);

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
        renderBeforeSearch={
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="filter"
              options={jobType}
              styles={dropdownColorStyles}
              onChange={(status) => {
                dispatch(actions.setJobStatus([status]));
              }}
              value={jobStatus || []}
              menuPlacement="auto"
              placeholder="Select Job Type"
              noOptionsMessage={() => "No Type Found"}
            />
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="filter"
              options={allJobOption.map((v) => ({
                label: v?.title,
                value: v?.job_id,
              }))}
              styles={dropdownColorStyles}
              onChange={(title) => {
                dispatch(actions.setJobTitle([title]));
              }}
              value={jobTitle || []}
              menuPlacement="auto"
              placeholder="Select Job Title"
              noOptionsMessage={() => "No Job Title Found"}
            />
            <Select
              className="basic-single"
              classNamePrefix="select"
              isSearchable={true}
              name="filter"
              options={allCityOption.map((v) => ({
                label: v?.city_name,
                value: v?.city_id,
              }))}
              styles={dropdownColorStyles}
              onChange={(city) => {
                dispatch(actions.setCity([city]));
              }}
              value={city || []}
              menuPlacement="auto"
              placeholder="Select City"
              noOptionsMessage={() => "No City Found"}
            />
          </Box>
        }
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

      {showCandidateModal && (
        <CandidateDetails
          showCandidateModal={showCandidateModal}
          setShowCandidateModal={setShowCandidateModal}
          candidateRowData={candidateRowData}
          selected={selected}
          setSelected={setSelected}
          getAllData={getAllData}
          selectedRow={selectedRow}
        />
      )}

      {showExpireJobModal && (
        <CandidateExpireJob
          showExpireJobModal={showExpireJobModal}
          setShowExpireJobModal={setShowExpireJobModal}
          expireJobDetail={expireJobDetail}
          setExpireJobDetail={setExpireJobDetail}
          getAllData={getAllData}
        />
      )}
    </Box>
  );
};

export default JobsTable;
