import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { StaffSlice } from "../../../_redux/Staff/StaffSlice";

import { StaffContext } from "../../StaffRoute";
import StaffTableConfig from "../../StaffTableConfig";

const StaffTable = ({ allStaff, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = StaffSlice;
  const context = useContext(StaffContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.staff.isLoading,
      filter: state.staff.filter,
      page: state.staff.page,
      dataCount: state.staff.dataCount,
      dataPerPage: state.staff.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allStaff.map((staff, i) =>
      StaffTableConfig.getFormattedData(staff, i)
    );

    setRowData(data);
  }, [allStaff]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Staff"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addStaff()}
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
        columnsConfig={StaffTableConfig.columns}
        numCols={StaffTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.staffFetched(row));
          context.openViewStaffDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.staffFetched(row));
          context.deleteStaff(row.id.data);
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

export default StaffTable;
