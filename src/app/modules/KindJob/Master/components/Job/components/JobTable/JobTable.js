import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { JobSlice } from "../../../../../_redux/Job/JobSlice";
import { JobContext } from "../../JobRoute";
import JobTableConfig from "../../JobTableConfig";

const JobTable = ({ allJob, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = JobSlice;
  const context = useContext(JobContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.job.isLoading,
      filter: state.job.filter,
      page: state.job.page,
      dataCount: state.job.dataCount,
      dataPerPage: state.job.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allJob.map((user, i) => JobTableConfig.getFormattedData(user));

    setRowData(data);
  }, [allJob]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Job"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addJob()}
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
        columnsConfig={JobTableConfig.columns}
        numCols={JobTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.jobFetched(row));
          context.openViewJobDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.jobFetched(row));
          context.deleteJob(row.id.data);
        }}
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

export default JobTable;
