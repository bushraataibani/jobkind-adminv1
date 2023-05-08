import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Button, Form } from "react-bootstrap";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import EmployeeTableConfig from "../../EmployeeTableConfig";

const SuccessJobModal = ({
  showSuccessJobModal,
  setShowSuccessJobModal,
  successRowData,
}) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;

  const { successpage, successDataCount, successDataPerPage } = useSelector(
    (state) => ({
      successpage: state.employee.successpage,
      successDataCount: state.employee.successDataCount,
      successDataPerPage: state.employee.successDataPerPage,
    }),
    shallowEqual
  );

  const handleClose = () => {
    setShowSuccessJobModal(false);
    dispatch(actions.removeSelectedEmployee());
  };

  return (
    <Dialog
      open={showSuccessJobModal}
      scroll={"paper"}
      maxWidth="xl"
      fullWidth={true}
    >
      <Form noValidate>
        <DialogCloseTitle onClose={() => handleClose()}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Success Jobs
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <TableCustomServer
            page={successpage}
            dataCount={successDataCount}
            dataPerPage={successDataPerPage}
            rowData={successRowData}
            columnsConfig={EmployeeTableConfig.successJobs}
            numCols={EmployeeTableConfig.successJobs.length}
            showPagination={true}
            showViewButton={false}
            showDeleteButton={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setSuccessJobPageData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setSuccessJobPageData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setSuccessJobPageData({ type: "SET_PAGE", data: 0 })
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default SuccessJobModal;
