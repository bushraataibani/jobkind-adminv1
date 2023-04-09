import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { RoleSlice } from "../../../_redux/Role/RoleSlice";
import { RoleContext } from "../../RoleRoute";
import RoleTableConfig from "../../RoleTableConfig";

const RoleTable = ({ allRole, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = RoleSlice;
  const context = useContext(RoleContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.role.isLoading,
      filter: state.role.filter,
      page: state.role.page,
      dataCount: state.role.dataCount,
      dataPerPage: state.role.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allRole?.map((user, i) =>
      RoleTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allRole]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Role"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addRole()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["role_id", "title"],
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
        columnsConfig={RoleTableConfig.columns}
        numCols={RoleTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.openViewRoleDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.stateFetched(row));
          context.deleteRole(row.id.data);
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

export default RoleTable;
