import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomServer from "../../../../../../Helpers/Table/TableCustomServer";
import { EmployerSlice } from "../../../../../_redux/Employer/EmployerSlice";
import { EmployerContext } from "../../../../EmployerRoute";
import EmployerTableConfig from "../../../../EmployerTableConfig";

const EmployerJobView = ({ show, id, onHide, allEmployerJob }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const context = useContext(EmployerContext);

  const { empPage, empDataPerPage, empDataCount } = useSelector(
    (state) => ({
      empPage: state.employer.empPage,
      empDataPerPage: state.employer.empDataPerPage,
      empDataCount: state.employer.empDataCount,
    }),
    shallowEqual
  );

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
              <TableCustomServer
                page={empPage}
                dataCount={empDataCount}
                dataPerPage={empDataPerPage}
                rowData={rowData !== undefined ? rowData : []}
                columnsConfig={EmployerTableConfig?.employerJobColumns}
                numCols={EmployerTableConfig?.employerJobColumns?.length}
                showPagination={true}
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
