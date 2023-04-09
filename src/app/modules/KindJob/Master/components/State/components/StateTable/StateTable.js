import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { StateSlice } from "../../../_redux/State/StateSlice";
import { StateContext } from "../../StateRoute";
import StateTableConfig from "../../StateTableConfig";

const StateTable = ({ allState, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = StateSlice;
  const context = useContext(StateContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.state.isLoading,
      filter: state.state.filter,
      page: state.state.page,
      dataCount: state.state.dataCount,
      dataPerPage: state.state.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allState?.map((user, i) =>
      StateTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allState]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="State"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addState()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["state_id", "state_name", "state_code"],
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
        columnsConfig={StateTableConfig.columns}
        numCols={StateTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.openViewStateDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.deleteState(row.id.data);
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

export default StateTable;
