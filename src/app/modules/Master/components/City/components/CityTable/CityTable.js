import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { CitySlice } from "../../../../../_redux/City/CitySlice";
import { CityContext } from "../../CityRoute";
import CityTableConfig from "../../CityTableConfig";

const CityTable = ({ allCity, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;
  const context = useContext(CityContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.city.isLoading,
      filter: state.city.filter,
      page: state.city.page,
      dataCount: state.city.dataCount,
      dataPerPage: state.city.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allCity?.map((user, i) =>
      CityTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allCity]);

  console.log(allCity, "allCity");

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="City"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addCity()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        refreshHandler={() => getAllData()}
        showSearch={true}
        filter={filter}
        refreshWhenWholeFilterChange={true}
        searchConfig={{
          searchKeys: ["city_id", "city_name"],
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
        columnsConfig={CityTableConfig.columns}
        numCols={CityTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.cityFetched(row));
          context.openViewCityDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.cityFetched(row));
          context.deleteCity(row.id.data);
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

export default CityTable;
