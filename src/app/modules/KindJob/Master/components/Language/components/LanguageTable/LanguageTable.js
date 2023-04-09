import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { LanguageSlice } from "../../../_redux/Language/LanguageSlice";
import { LanguageContext } from "../../LanguageRoute";
import LanguageTableConfig from "../../LanguageTableConfig";

const LanguageTable = ({ allLanguage, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = LanguageSlice;
  const context = useContext(LanguageContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.language.isLoading,
      filter: state.language.filter,
      page: state.language.page,
      dataCount: state.language.dataCount,
      dataPerPage: state.language.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allLanguage.map((user, i) =>
      LanguageTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allLanguage]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Language"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addLanguage()}
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
        columnsConfig={LanguageTableConfig.columns}
        numCols={LanguageTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.languageFetched(row));
          context.openViewLanguageDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.languageFetched(row));
          context.deleteLanguage(row.id.data);
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

export default LanguageTable;
