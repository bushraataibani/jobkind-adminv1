import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { JobsContext } from "../../JobsRoute";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import JobsTableConfig from "../../JobsTableConfig";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";

const JobsTable = ({ allJobs, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;
  const context = useContext(JobsContext);

  const [rowData, setRowData] = useState([]);

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
      />
      <TableCustomServer
        page={page}
        dataCount={dataCount}
        dataPerPage={dataPerPage}
        rowData={rowData}
        columnsConfig={JobsTableConfig.columns}
        numCols={JobsTableConfig.columns.length}
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
  );
};

export default JobsTable;
