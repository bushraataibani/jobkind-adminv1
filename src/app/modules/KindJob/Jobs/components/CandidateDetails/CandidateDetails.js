import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomSelect from "../../../../Helpers/Table/TableCustomSelect";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { assignListEmployee } from "../../../_redux/Jobs/JobsCrud";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import JobsTableConfig from "../../JobsTableConfig";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";

const CandidateDetails = ({
  showCandidateModal,
  setShowCandidateModal,
  candidateRowData,
  setSelected,
  selected,
  getAllData,
  selectedRow,
  getAllCandidateData,
}) => {
  const dispatch = useDispatch();
  const { actions: generalActions } = generalSlice;

  const { actions } = jobsSlice;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    candidatePage,
    candidateDataPerPage,
    candidateDataCount,
    candidateFilter,
  } = useSelector(
    (state) => ({
      candidatePage: state.jobs.candidatePage,
      candidateDataPerPage: state.jobs.candidateDataPerPage,
      candidateDataCount: state.jobs.candidateDataCount,
      candidateFilter: state.jobs.candidateFilter,
    }),
    shallowEqual
  );

  const handleSubmit = () => {
    setIsSubmitting(true);
    assignListEmployee({
      main_job_ids: [selectedRow?.id?.data],
      user_ids: selected?.map((item) => item?.id?.data),
    })
      .then((res) => {
        dispatch(
          generalActions.pushNewAlert({
            show: true,
            heading: "Success",
            message: successMessage("Assigned", "job"),
            type: "success",
          })
        );
        setIsSubmitting(false);
        setShowCandidateModal(false);
        getAllData();
      })
      .catch((err) => setIsSubmitting(false));
  };

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
        <EnhancedTableToolbar
          title=""
          showbackBtn={false}
          showAdd={false}
          showReload={false}
          refreshHandler={() => getAllCandidateData()}
          showSearch={true}
          filter={candidateFilter}
          refreshWhenWholeFilterChange={true}
          searchConfig={{
            searchKeys: ["collage_id", "collage_name"],
            filterValue: candidateFilter?.search?.keyword || "",
            setSearchConfig: (data) => {
              dispatch(actions.setCandidateFilter(data));
              dispatch(
                actions.setCandidatePageConfigData({
                  type: "SET_PAGE",
                  data: 0,
                })
              );
            },
          }}
        />

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
          isSubmitting={isSubmitting}
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CandidateDetails;
