import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { CountrySlice } from "../../../../../_redux/Country/CountrySlice";
import { CountryContext } from "../../CountryRoute";
import CountryTableConfig from "../../CountryTableConfig";

const CountryTable = ({ allCountry, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = CountrySlice;
  const context = useContext(CountryContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.country.isLoading,
      filter: state.country.filter,
      page: state.country.page,
      dataCount: state.country.dataCount,
      dataPerPage: state.country.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allCountry?.map((user, i) =>
      CountryTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allCountry]);

  console.log(allCountry, "allCountry");

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Country"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addCountry()}
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
        columnsConfig={CountryTableConfig.columns}
        numCols={CountryTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.countryFetched(row));
          context.openViewCountryDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.countryFetched(row));
          context.deleteCountry(row.id.data);
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
          dispatch(actions.setPageConfigData({ type: "SET_PAGE", data: 1 }));
        }}
      />
    </Box>
  );
};

export default CountryTable;
