/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import EmployerTableConfig from "../../EmployerTableConfig";
import TableCustom from "../../../../Helpers/Table/TableCustom";

const EmployerProfileModalTable = ({
  arr,
  rowData,
  allEmpProfile,
  setRowData,
}) => {
  useEffect(() => {
    const data = arr?.map((user, i) =>
      EmployerTableConfig.getFormattedEmployer(user, i)
    );

    setRowData(data);
  }, [allEmpProfile]);

  return (
    <TableCustom
      rowData={rowData !== undefined ? rowData : []}
      showViewButton={false}
      showDeleteButton={false}
      viewAction={false}
      deleteAction={false}
      showPagination={false}
      columnsConfig={EmployerTableConfig?.employerCol}
      numCols={EmployerTableConfig?.employerCol?.length}
    />
  );
};

export default EmployerProfileModalTable;
