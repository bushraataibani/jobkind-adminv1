/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import TableCustom from "../../../../Helpers/Table/TableCustom";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../EmployerRoute";
import EmployerTableConfig from "../../EmployerTableConfig";

const EmployerProfileModalTable = ({
  arr,
  rowData,
  allEmpProfile,
  setRowData,
  onHide,
}) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);

  useEffect(() => {
    const data = arr?.map((user, i) =>
      EmployerTableConfig.getFormattedEmployer(user, i, allEmpProfile)
    );

    setRowData(data);
  }, [allEmpProfile]);

  return (
    <TableCustom
      rowData={rowData !== undefined ? rowData : []}
      showDeleteButton={false}
      viewAction={(row) => {
        dispatch(actions.employerFetched(row));
        context.employerJobDialog(row?.id?.data);
      }}
      deleteAction={false}
      showPagination={false}
      columnsConfig={EmployerTableConfig?.employerCol}
      numCols={EmployerTableConfig?.employerCol?.length}
    />
  );
};

export default EmployerProfileModalTable;
