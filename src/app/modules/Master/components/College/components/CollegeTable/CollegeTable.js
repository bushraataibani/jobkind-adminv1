import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EnhancedTableToolbar from "../../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustom from "../../../../../Helpers/Table/TableCustom";
import { CollegeContext } from "../../CollegeRoute";
import CollegeTableConfig from "../../CollegeTableConfig";

const CollegeTable = ({ allCollege }) => {
  const context = useContext(CollegeContext);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allCollege.map((user, i) =>
      CollegeTableConfig.getFormattedData(user)
    );

    setRowData(data);
  }, [allCollege]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="College"
        btnHandler={() => context.addCollege()}
        tooltipTitle="Add Role"
        btnTitle="ADD"
        showAdd={true}
      />
      <TableCustom
        rowData={rowData}
        columnsConfig={CollegeTableConfig.columns}
        numCols={CollegeTableConfig.columns.length}
        showPagination={false}
      />
    </Box>
  );
};

export default CollegeTable;
