import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomServer from "../../../../Helpers/Table/TableCustomServer";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";
import EmployeeTableConfig from "../../EmployeeTableConfig";

const TotalJobModal = ({ showJobModal, setShowJobModal, jobRowData }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;

  const { allJobpage, allJobDataCount, allJobDataPerPage } = useSelector(
    (state) => ({
      allJobpage: state.employee.allJobpage,
      allJobDataCount: state.employee.allJobDataCount,
      allJobDataPerPage: state.employee.allJobDataPerPage,
    }),
    shallowEqual
  );

  const handleClose = () => {
    setShowJobModal(false);
  };

  return (
    <Dialog open={showJobModal} scroll={"paper"} maxWidth="xl" fullWidth={true}>
      <Form noValidate>
        <DialogCloseTitle onClose={() => handleClose()}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Total Jobs
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <TableCustomServer
            page={allJobpage}
            dataCount={allJobDataCount}
            dataPerPage={allJobDataPerPage}
            rowData={jobRowData}
            columnsConfig={EmployeeTableConfig.totalJobs}
            numCols={EmployeeTableConfig.totalJobs.length}
            showPagination={true}
            showViewButton={false}
            showDeleteButton={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setAllJobPageData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setAllJobPageData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setAllJobPageData({ type: "SET_PAGE", data: 0 })
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

export default TotalJobModal;
