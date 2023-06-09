import { Box } from "@mui/material";
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { CandidateMgtSlice } from "../../../_redux/CandidateMgt/CandidateMgtSlice";
import { CandidateMgtContext } from "../../CandidateMgtRoute";
import CandidateMgtTableConfig from "../../CandidateMgtTableConfig";

const CandidateMgtTable = ({ allCandidateMgt }) => {
  const dispatch = useDispatch();
  const { actions } = CandidateMgtSlice;
  const context = useContext(CandidateMgtContext);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.candidateMgt.isLoading,
      filter: state.candidateMgt.filter,
      page: state.candidateMgt.page,
      dataCount: state.candidateMgt.dataCount,
      dataPerPage: state.candidateMgt.dataPerPage,
    }),
    shallowEqual
  );

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Candidate Management"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Cadidate mgt"
        btnHandler={() => context.addCandidateMgt()}
        circularLoader={
          isLoading && <Spinner animation="border" style={{ margin: "10px" }} />
        }
        // refreshHandler={() => getAllData()}
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
        rowData={[]}
        columnsConfig={CandidateMgtTableConfig.columns}
        numCols={CandidateMgtTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.candidateMgtFetched(row));
          context.openViewCandidateMgtDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.candidateMgtFetched(row));
          context.deleteCandidateMgt(row.id.data);
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

export default CandidateMgtTable;
