/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { PermissionProfileSlice } from "../../../_redux/PermissionProfile/PermissionProfileSlice";
import { PermissionProfileContext } from "../../PermissionProfileRoute";
import PermissionProfileTableConfig from "../../PermissionProfileTableConfig";

const PermissionProfileTable = ({ allProfilePermission, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;
  const context = useContext(PermissionProfileContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.permission.isLoading,
      filter: state.permission.filter,
      page: state.permission.page,
      dataCount: state.permission.dataCount,
      dataPerPage: state.permission.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allProfilePermission.map((permission, i) =>
      PermissionProfileTableConfig.getFormattedData(permission, i)
    );

    setRowData(data);
  }, [allProfilePermission]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Permission Profile"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Permission"
        btnHandler={() => context.addPermissionProfile()}
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
        columnsConfig={PermissionProfileTableConfig.columns}
        numCols={PermissionProfileTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.ProfilePermissionFetched(row));
          context.openViewPermissionProfileDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.ProfilePermissionFetched(row));
          context.deletePermissionProfile(row.id.data);
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

export default PermissionProfileTable;
