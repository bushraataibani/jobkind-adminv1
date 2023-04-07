import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { SpecializationSlice } from "../../../../../_redux/Specialization/SpecializationSlice";
import { SpecializationContext } from "../../SpecializationRoute";
import SpecializationTableConfig from "../../SpecializationTableConfig";

const SpecializationTable = ({ allSpecialization, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = SpecializationSlice;
  const context = useContext(SpecializationContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.specialization.isLoading,
      filter: state.specialization.filter,
      page: state.specialization.page,
      dataCount: state.specialization.dataCount,
      dataPerPage: state.specialization.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allSpecialization?.map((user, i) =>
      SpecializationTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allSpecialization]);

  console.log(allSpecialization, "allSpecialization");

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Specialization"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addSpecialization()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["specialization_id", "title"],
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
        columnsConfig={SpecializationTableConfig.columns}
        numCols={SpecializationTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.specializationFetched(row));
          context.openViewSpecializationDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.specializationFetched(row));
          context.deleteSpecialization(row.id.data);
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

export default SpecializationTable;
