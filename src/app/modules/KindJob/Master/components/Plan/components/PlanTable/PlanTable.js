import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { PlanSlice } from "../../../../../_redux/Plan/PlanSlice";
import { PlanContext } from "../../PlanRoute";
import PlanTableConfig, { subColumns } from "../../PlanTableConfig";

const PlanTable = ({ allPlan, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = PlanSlice;
  const context = useContext(PlanContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.plan.isLoading,
      filter: state.plan.filter,
      page: state.plan.page,
      dataCount: state.plan.dataCount,
      dataPerPage: state.plan.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allPlan.map((plan, i) =>
      PlanTableConfig.getFormattedData(plan, i)
    );

    setRowData(data);
  }, [allPlan]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Plan"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addPlan()}
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
        secondColumnsConfig={subColumns}
        isBorderHeader={true}
        columnsConfig={PlanTableConfig.columns}
        numCols={PlanTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.planFetched(row));
          context.openViewPlanDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.planFetched(row));
          context.deletePlan(row.id.data);
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

export default PlanTable;
