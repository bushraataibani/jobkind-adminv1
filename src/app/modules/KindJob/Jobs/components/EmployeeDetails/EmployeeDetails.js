import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import JobsTableConfig from "../../JobsTableConfig";

const EmployeeDetails = ({
  showEmployeeModal,
  setShowEmployeeModal,
  empRowData,
}) => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;

  const { empPage, empDataPerPage, empDataCount } = useSelector(
    (state) => ({
      empPage: state.jobs.empPage,
      empDataPerPage: state.jobs.empDataPerPage,
      empDataCount: state.jobs.empDataCount,
    }),
    shallowEqual
  );

  return (
    <Dialog
      open={showEmployeeModal}
      scroll={"paper"}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogCloseTitle onClose={() => setShowEmployeeModal(false)}>
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Employee
        </Box>
      </DialogCloseTitle>
      <DialogContent dividers>
        <TableCustomServer
          page={empPage}
          dataCount={empDataCount}
          dataPerPage={empDataPerPage}
          rowData={empRowData}
          columnsConfig={JobsTableConfig.empColumns}
          numCols={JobsTableConfig.empColumns.length}
          noDecor={true}
          noColor={true}
          showPagination={true}
          showViewButton={false}
          showDeleteButton={false}
          handleSetPage={(newPage) => {
            dispatch(
              actions.setEmpPageConfigData({
                type: "SET_PAGE",
                data: newPage,
              })
            );
          }}
          handleNoOfRowsPerPage={(value) => {
            dispatch(
              actions.setEmpPageConfigData({
                type: "SET_DATA_PER_PAGE",
                data: parseInt(value, 10),
              })
            );
            dispatch(
              actions.setEmpPageConfigData({ type: "SET_PAGE", data: 0 })
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={() => setShowEmployeeModal(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeDetails;
