import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { SubscribeSlice } from "../../../_redux/Subscribe/SubscribeSlice";
import { SubscribeContext } from "../../SubscribeRoute";
import SubscribeTableConfig from "../../SubscribeTableConfig";

const SubscribeTable = ({ allSubscribe, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = SubscribeSlice;
  const context = useContext(SubscribeContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.subscribe.isLoading,
      filter: state.subscribe.filter,
      page: state.subscribe.page,
      dataCount: state.subscribe.dataCount,
      dataPerPage: state.subscribe.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allSubscribe.map((subscribe, i) =>
      SubscribeTableConfig.getFormattedData(subscribe, i)
    );

    setRowData(data);
  }, [allSubscribe]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Subscribe"
        showAdd={false}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addSubscribe()}
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
        columnsConfig={SubscribeTableConfig.columns}
        numCols={SubscribeTableConfig.columns.length}
        showPagination={true}
        showViewButton={false}
        showDeleteButton={false}
        // viewAction={(row) => {
        //   dispatch(actions.subscribeFetched(row));
        //   context.openViewSubscribeDialog(row?.id?.data);
        // }}
        // deleteAction={(row) => {
        //   dispatch(actions.subscribeFetched(row));
        //   context.deleteSubscribe(row.id.data);
        // }}
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

export default SubscribeTable;
