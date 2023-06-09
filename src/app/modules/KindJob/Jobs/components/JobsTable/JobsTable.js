import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { JobsContext } from "../../JobsRoute";
import JobsTableConfig from "../../JobsTableConfig";
import CandidateDetails from "../CandidateDetails/CandidateDetails";
import JobsDescription from "../JobsDescription/JobsDescription";

const JobsTable = ({ allJobs, getAllData, allCandidate }) => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;
  const context = useContext(JobsContext);

  const [rowData, setRowData] = useState([]);
  const [showDescModal, setShowDescModal] = useState(false);
  const [selectedDesc, setSelectedDesc] = useState({});

  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [candidateRowData, setCandidateRowData] = useState([]);

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
        showExtraBtn={true}
        extraBtnHandler={() => setShowCandidateModal(true)}
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
        showExtraButton={false}
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
        />
      )}
    </Box>
  );
};

export default JobsTable;
