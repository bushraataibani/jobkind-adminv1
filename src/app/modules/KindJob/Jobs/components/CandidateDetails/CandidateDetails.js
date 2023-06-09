import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomSelect from "../../../../Helpers/Table/TableCustomSelect";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import JobsTableConfig from "../../JobsTableConfig";

const CandidateDetails = ({
  showCandidateModal,
  setShowCandidateModal,
  candidateRowData,
  setSelected,
  selected,
}) => {
  const dispatch = useDispatch();
  const { actions } = jobsSlice;

  const {
    candidatePage,
    candidateDataPerPage,
    candidateDataCount,
  } = useSelector(
    (state) => ({
      candidatePage: state.jobs.candidatePage,
      candidateDataPerPage: state.jobs.candidateDataPerPage,
      candidateDataCount: state.jobs.candidateDataCount,
    }),
    shallowEqual
  );
  console.log(selected, "selected");
  return (
    <Dialog
      open={showCandidateModal}
      scroll={"paper"}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogCloseTitle onClose={() => setShowCandidateModal(false)}>
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
        <TableCustomSelect
          page={candidatePage}
          dataCount={candidateDataCount}
          dataPerPage={candidateDataPerPage}
          rowData={candidateRowData}
          columnsConfig={JobsTableConfig.empColumns}
          numCols={JobsTableConfig.empColumns.length}
          showViewButton={false}
          showDeleteButton={false}
          selectedCheckbox={selected}
          setSelectedCheckbox={setSelected}
          handleSetPage={(newPage) => {
            dispatch(
              actions.setCandidatePageConfigData({
                type: "SET_PAGE",
                data: newPage,
              })
            );
          }}
          handleNoOfRowsPerPage={(value) => {
            dispatch(
              actions.setCandidatePageConfigData({
                type: "SET_DATA_PER_PAGE",
                data: parseInt(value, 10),
              })
            );
            dispatch(
              actions.setCandidatePageConfigData({ type: "SET_PAGE", data: 0 })
            );
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="secondary"
          onClick={() => setShowCandidateModal(false)}
        >
          Cancel
        </Button>
        <BootstrapButton
          variant="success"
          type="submit"
          label="Assign"
          labelWhenSubmitting="Assigning"
          // isSubmitting={isSubmitting}
          // onClick={handleSubmit}
          // disabled={isSubmitting}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CandidateDetails;
