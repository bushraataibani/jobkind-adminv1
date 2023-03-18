import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import EnhancedTableToolbar from "../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";
import TableCustom from "../../../Helpers/Table/TableCustom";
import { UserContext } from "../../UserRoute";
import tableConfig from "../../UserTableConfig";

const UserTable = ({ allUsers }) => {
  const context = useContext(UserContext);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allUsers.map((user, i) => tableConfig.getFormattedData(user));

    setRowData(data);
  }, [allUsers]);

  return (
    <Box
      sx={{
        padding: "20px",
        background: "#f8f8f8",
      }}
    >
      <EnhancedTableToolbar
        title="Users"
        btnHandler={() => context.addUser()}
        tooltipTitle="Add Role"
        btnTitle="ADD"
        showAdd={true}
      />

      <TableCustom
        rowData={rowData}
        columnsConfig={tableConfig.columns}
        numCols={tableConfig.columns.length}
        showPagination={false}
      />
    </Box>
  );
};

export default UserTable;
