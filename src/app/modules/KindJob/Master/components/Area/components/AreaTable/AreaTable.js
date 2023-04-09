/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { AreaSlice } from "../../../../../_redux/Area/AreaSlice";
import { AreaContext } from "../../AreaRoute";
import AreaTableConfig from "../../AreaTableConfig";

const AreaTable = ({ allArea, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = AreaSlice;
  const context = useContext(AreaContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.area.isLoading,
      filter: state.area.filter,
      page: state.area.page,
      dataCount: state.area.dataCount,
      dataPerPage: state.area.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allArea?.map((user, i) =>
      AreaTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allArea]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Area"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addArea()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["area_id", "area_name", "state_code"],
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
        columnsConfig={AreaTableConfig.columns}
        numCols={AreaTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.openViewAreaDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.deleteArea(row.id.data);
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

export default AreaTable;
