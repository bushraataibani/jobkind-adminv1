import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustom from "../../../../../../Helpers/Table/TableCustom";
import { EmployerSlice } from "../../../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../../../EmployerRoute";
import EmployerTableConfig from "../../../../EmployerTableConfig";

const EmployerJobView = ({ show, id, onHide, allEmployerJob }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const data = allEmployerJob?.map((job, i) =>
      EmployerTableConfig.getFormattedEmployerJob(job, i)
    );

    setRowData(data);
  }, [allEmployerJob]);

  return (
    <Dialog open={show} scroll={"paper"} fullScreen>
      <Form noValidate>
        <DialogCloseTitle onClose={closeModal({ onHide })}>
          <Box
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Employer Job
          </Box>
        </DialogCloseTitle>
        <DialogContent>
          <Row>
            <Col sm={9} md={9}>
              <TableCustom
                rowData={rowData !== undefined ? rowData : []}
                showViewButton={true}
                showDeleteButton={false}
                viewAction={(row) => {
                  dispatch(actions.employerFetched(row));
                  context.employerJobApplyEmployeeDialog(
                    parseInt(row?.user_id?.data),
                    parseInt(row?.id?.data)
                  );
                }}
                deleteAction={false}
                showPagination={false}
                columnsConfig={EmployerTableConfig?.employerJobColumns}
                numCols={EmployerTableConfig?.employerJobColumns?.length}
              />
            </Col>
            <Col sm={3} md={3}>
              Job Details
            </Col>
          </Row>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default EmployerJobView;
