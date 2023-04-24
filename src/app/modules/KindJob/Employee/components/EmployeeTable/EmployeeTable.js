import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";

import { EmployeeContext } from "../../EmployeeRoute";
import EmployeeTableConfig from "../../EmployeeTableConfig";

const EmployeeTable = ({ allEmployee, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const context = useContext(EmployeeContext);
  const [rowData, setRowData] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.employee.isLoading,
      filter: state.employee.filter,
      page: state.employee.page,
      dataCount: state.employee.dataCount,
      dataPerPage: state.employee.dataPerPage,
    }),
    shallowEqual
  );

  const clickableFunc = () => {};

  useEffect(() => {
    const data = allEmployee.map((employee, i) =>
      EmployeeTableConfig.getFormattedData(employee, i, clickableFunc)
    );

    setRowData(data);
  }, [allEmployee]);

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          background: "#f8f8f8",
        }}
      >
        <EnhancedTableToolbar
          title="Employee"
          showAdd={false}
          btnTitle="ADD"
          tooltipTitle="Add Role"
          btnHandler={() => context.addEmployee()}
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
          columnsConfig={EmployeeTableConfig.columns}
          numCols={EmployeeTableConfig.columns.length}
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
    </>
  );
};

export default EmployeeTable;
