import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { CollegeSlice } from "../../../../../_redux/College/CollegeSlice";
import { CollegeContext } from "../../CollegeRoute";
import CollegeTableConfig from "../../CollegeTableConfig";

const CollegeTable = ({ allCollege, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = CollegeSlice;
  const context = useContext(CollegeContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.college.isLoading,
      filter: state.college.filter,
      page: state.college.page,
      dataCount: state.college.dataCount,
      dataPerPage: state.college.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allCollege.map((user, i) =>
      CollegeTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allCollege]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="College"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addCollege()}
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
        columnsConfig={CollegeTableConfig.columns}
        numCols={CollegeTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.collegeFetched(row));
          context.openViewCollegeDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.collegeFetched(row));
          context.deleteCollege(row.id.data);
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

export default CollegeTable;
