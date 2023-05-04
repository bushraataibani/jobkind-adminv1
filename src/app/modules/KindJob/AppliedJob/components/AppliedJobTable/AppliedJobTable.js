import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { AppliedJobSlice } from "../../../_redux/AppliedJob/AppliedJobSlice";
import { AppliedJobContext } from "../../AppliedJobRoute";
import AppliedJobTableConfig from "../../AppliedJobTableConfig";

const AppliedJobTable = ({ allAppliedJob, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;
  const context = useContext(AppliedJobContext);
  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.appliedJob.isLoading,
      filter: state.appliedJob.filter,
      page: state.appliedJob.page,
      dataCount: state.appliedJob.dataCount,
      dataPerPage: state.appliedJob.dataPerPage,
    }),
    shallowEqual
  );

  const handleAppliedJobJobList = (row) => {
    dispatch(actions.appliedJobFetched(row));
    context.appliedJobProfile(row.id.data);
  };

  const renderBtn = (row) => {
    return (
      <>
        <Tooltip
          disableInteractive={true}
          arrow
          title="AppliedJob Profile"
          placement="bottom"
        >
          <IconButton
            aria-label="AppliedJob Profile"
            onClick={() => handleAppliedJobJobList(row)}
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
      </>
    );
  };

  useEffect(() => {
    const data = allAppliedJob.map((appliedJob, i) =>
      AppliedJobTableConfig.getFormattedData(appliedJob, i)
    );

    setRowData(data);
  }, [allAppliedJob]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          background: "#f8f8f8",
        }}
      >
        <EnhancedTableToolbar
          title="AppliedJob"
          showAdd={false}
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
          columnsConfig={AppliedJobTableConfig.columns}
          numCols={AppliedJobTableConfig.columns.length}
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
      </Box>
    </>
  );
};

export default AppliedJobTable;
