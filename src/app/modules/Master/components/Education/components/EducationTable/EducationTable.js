import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { EducationSlice } from "../../../../../_redux/Education/EducationSlice";
import { EducationContext } from "../../EducationRoute";
import EducationTableConfig from "../../EducationTableConfig";

const EducationTable = ({ allEducation, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = EducationSlice;
  const context = useContext(EducationContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.education.isLoading,
      filter: state.education.filter,
      page: state.education.page,
      dataCount: state.education.dataCount,
      dataPerPage: state.education.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allEducation?.map((user, i) =>
      EducationTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allEducation]);

  console.log(allEducation, "allEducation");

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Education"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addEducation()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["education_id", "title"],
          filterValue: filter?.search?.keyword || "",
          setSearchConfig: (data) => {
            dispatch(actions.setFilter(data));
            dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 1 }));
          },
        }}
      />
      <TableCustomServer
        page={page}
        dataCount={dataCount}
        dataPerPage={dataPerPage}
        rowData={rowData}
        columnsConfig={EducationTableConfig.columns}
        numCols={EducationTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.educationFetched(row));
          context.openViewEducationDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.educationFetched(row));
          context.deleteEducation(row.id.data);
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

export default EducationTable;
