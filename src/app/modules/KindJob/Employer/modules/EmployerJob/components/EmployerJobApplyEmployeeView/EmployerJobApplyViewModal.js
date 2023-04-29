import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustom from "../../../../../../Helpers/Table/TableCustom";
import { EmployerSlice } from "../../../../../_redux/Employer/EmployerSlice";
import EmployerTableConfig from "../../../../EmployerTableConfig";

const EmployerJobApplyViewModal = ({
  show,
  id,
  onHide,
  allEmployerApplyJob,
}) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const { empJobPage, empJobDataPerPage, empJobDataCount } = useSelector(
    (state) => ({
      empJobPage: state.employer.empJobPage,
      empJobDataPerPage: state.employer.empJobDataPerPage,
      empJobDataCount: state.employer.empJobDataCount,
    }),
    shallowEqual
  );

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allEmployerApplyJob?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerApplyJob(job, i)
    );

    setRowData(data);
  }, [allEmployerApplyJob]);

  return (
    <Dialog open={show} scroll={"paper"} maxWidth="md" fullWidth={true}>
      <Form noValidate>
        <DialogCloseTitle onClose={closeModal({ onHide })}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Employer Job Apply Employee
          </Box>
        </DialogCloseTitle>
        <DialogContent dividers>
          <TableCustom
            page={empJobPage}
            dataCount={empJobDataCount}
            dataPerPage={empJobDataPerPage}
            rowData={rowData !== undefined ? rowData : []}
            columnsConfig={EmployerTableConfig?.employerApplyJobColumns}
            numCols={EmployerTableConfig?.employerApplyJobColumns?.length}
            showPagination={true}
            showViewButton={false}
            showDeleteButton={false}
            deleteAction={false}
            handleSetPage={(newPage) => {
              dispatch(
                actions.setEmpJobPageConfigData({
                  type: "SET_PAGE",
                  data: newPage,
                })
              );
            }}
            handleNoOfRowsPerPage={(value) => {
              dispatch(
                actions.setEmpJobPageConfigData({
                  type: "SET_DATA_PER_PAGE",
                  data: parseInt(value, 10),
                })
              );
              dispatch(
                actions.setEmpJobPageConfigData({ type: "SET_PAGE", data: 0 })
              );
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="secondary" onClick={closeModal({ onHide })}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default EmployerJobApplyViewModal;
