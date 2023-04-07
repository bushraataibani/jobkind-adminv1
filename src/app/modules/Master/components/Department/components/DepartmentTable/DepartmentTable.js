import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { DepartmentSlice } from "../../../../../_redux/Department/DepartmentSlice";
import { DepartmentContext } from "../../DepartmentRoute";
import DepartmentTableConfig from "../../DepartmentTableConfig";

const DepartmentTable = ({ allDepartment, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = DepartmentSlice;
  const context = useContext(DepartmentContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.department.isLoading,
      filter: state.department.filter,
      page: state.department.page,
      dataCount: state.department.dataCount,
      dataPerPage: state.department.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allDepartment.map((user, i) =>
      DepartmentTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allDepartment]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Department"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addDepartment()}
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
        columnsConfig={DepartmentTableConfig.columns}
        numCols={DepartmentTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.departmentFetched(row));
          context.openViewDepartmentDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.departmentFetched(row));
          context.deleteDepartment(row.id.data);
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
          dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 1 }));
        }}
      />
    </Box>
  );
};

export default DepartmentTable;
