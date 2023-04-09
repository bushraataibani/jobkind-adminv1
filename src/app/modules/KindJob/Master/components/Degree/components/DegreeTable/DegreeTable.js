import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { DegreeSlice } from "../../../../../_redux/Degree/DegreeSlice";
import { DegreeContext } from "../../DegreeRoute";
import DegreeTableConfig from "../../DegreeTableConfig";

const DegreeTable = ({ allDegree, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;
  const context = useContext(DegreeContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.degree.isLoading,
      filter: state.degree.filter,
      page: state.degree.page,
      dataCount: state.degree.dataCount,
      dataPerPage: state.degree.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allDegree?.map((user, i) =>
      DegreeTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allDegree]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Degree"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addDegree()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["degree_id", "title"],
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
        columnsConfig={DegreeTableConfig.columns}
        numCols={DegreeTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.degreeFetched(row));
          context.openViewDegreeDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.degreeFetched(row));
          context.deleteDegree(row.id.data);
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

export default DegreeTable;
