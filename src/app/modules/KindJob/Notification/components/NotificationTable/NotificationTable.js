import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { NotificationSlice } from "../../../_redux/Notification/NotificationSlice";
import { NotificationContext } from "../../NotificationRoute";
import NotificationTableConfig from "../../NotificationTableConfig";

const NotificationTable = ({ allNotification, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = NotificationSlice;
  const context = useContext(NotificationContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.notification.isLoading,
      filter: state.notification.filter,
      page: state.notification.page,
      dataCount: state.notification.dataCount,
      dataPerPage: state.notification.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allNotification.map((lang, i) =>
      NotificationTableConfig.getFormattedData(lang, i)
    );

    setRowData(data);
  }, [allNotification]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Notification"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addNotification()}
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
        columnsConfig={NotificationTableConfig.columns}
        numCols={NotificationTableConfig.columns.length}
        showPagination={true}
        showDeleteButton={false}
        viewAction={(row) => {
          dispatch(actions.notificationFetched(row));
          context.openViewNotificationDialog(row?.id?.data);
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

export default NotificationTable;
