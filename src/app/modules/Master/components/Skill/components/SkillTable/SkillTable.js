import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustomServer from "../../../../../Helpers/Table/TableCustomServer";
import { SkillSlice } from "../../../../../_redux/Skill/SkillSlice";
import { SkillContext } from "../../SkillRoute";
import SkillTableConfig from "../../SkillTableConfig";

const SkillTable = ({ allSkill, getAllData }) => {
  const dispatch = useDispatch();
  const { actions } = SkillSlice;
  const context = useContext(SkillContext);

  const [rowData, setRowData] = useState([]);

  const { isLoading, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      isLoading: state.skill.isLoading,
      filter: state.skill.filter,
      page: state.skill.page,
      dataCount: state.skill.dataCount,
      dataPerPage: state.skill.dataPerPage,
    }),
    shallowEqual
  );

  useEffect(() => {
    const data = allSkill?.map((user, i) =>
      SkillTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allSkill]);

  console.log(allSkill, "allSkill");

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Skill"
        showAdd={true}
        btnTitle="ADD"
        tooltipTitle="Add Role"
        btnHandler={() => context.addSkill()}
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
        columnsConfig={SkillTableConfig.columns}
        numCols={SkillTableConfig.columns.length}
        showPagination={true}
        viewAction={(row) => {
          dispatch(actions.skillFetched(row));
          context.openViewSkillDialog(row?.id?.data);
        }}
        deleteAction={(row) => {
          dispatch(actions.skillFetched(row));
          context.deleteSkill(row.id.data);
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

export default SkillTable;
