import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustom from "../../../../../../Helpers/Table/TableCustom";
import EmployerTableConfig from "../../../../EmployerTableConfig";

const EmployerJobApplyViewModal = ({
  show,
  id,
  onHide,
  allEmployerApplyJob,
}) => {
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
          {" "}
          <TableCustom
            rowData={rowData !== undefined ? rowData : []}
            showViewButton={false}
            showDeleteButton={false}
            deleteAction={false}
            showPagination={false}
            columnsConfig={EmployerTableConfig?.employerApplyJobColumns}
            numCols={EmployerTableConfig?.employerApplyJobColumns?.length}
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
