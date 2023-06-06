import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SeoSlice } from "../../../_redux/SEO/SeoSlice";
import { SeoContext } from "../../SeoRoute";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import SeoTableConfig from "../../SeoTableConfig";

const SeoTable = ({ allSeo, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = SeoSlice;
  const context = useContext(SeoContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.seo.isLoading,
      filter: state.seo.filter,
      page: state.seo.page,
      dataCount: state.seo.dataCount,
      dataPerPage: state.seo.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allSeo.map((lang, i) =>
      SeoTableConfig.getFormattedData(lang, i)
    );

    setRowData(data);
  }, [allSeo]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="SEO"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addSeo()}
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
        columnsConfig={SeoTableConfig.columns}
        numCols={SeoTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.seoFetched(row));
          context.openViewSeoDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.seoFetched(row));
          context.deleteSeo(row.id.data);
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

export default SeoTable;
