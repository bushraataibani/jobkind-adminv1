import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { IndustrySlice } from "../../../../../_redux/Industry/IndustrySlice";
import { IndustryContext } from "../../IndustryRoute";
import IndustryTableConfig from "../../IndustryTableConfig";

const IndustryTable = ({ allIndustry, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = IndustrySlice;
  const context = useContext(IndustryContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.industry.isLoading,
      filter: state.industry.filter,
      page: state.industry.page,
      dataCount: state.industry.dataCount,
      dataPerPage: state.industry.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allIndustry.map((user, i) =>
      IndustryTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allIndustry]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Industry"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addIndustry()}
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
            dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 1 }));
          },
        }}
      />
      <TableCustomServer
        page={page}
        dataCount={dataCount}
        dataPerPage={dataPerPage}
        rowData={rowData}
        columnsConfig={IndustryTableConfig.columns}
        numCols={IndustryTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.industryFetched(row));
          context.openViewIndustryDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.industryFetched(row));
          context.deleteIndustry(row.id.data);
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

export default IndustryTable;
