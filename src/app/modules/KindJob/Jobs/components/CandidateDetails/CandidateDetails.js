import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import noResult from "../../../../../../assets/noResut.svg";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TablePaginationActions from "../../../../Helpers/TablePagination/TablePaginationActions";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { assignListEmployee } from "../../../_redux/Jobs/JobsCrud";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import JobsTableConfig from "../../JobsTableConfig";

const CandidateDetails = ({
  showCandidateModal,
  setShowCandidateModal,
  candidateRowData,
  allJobOption,
  getAllData,
}) => {
  const [rowData, setRowData] = useState(candidateRowData);
  const dispatch = useDispatch();
  const { actions: generalActions } = generalSlice;

  const { actions } = jobsSlice;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSelectHandler = (event, index) => {
    if (event.target.checked) {
      let tempData = JSON.parse(JSON.stringify(rowData));
      tempData[index].selected = event.target.checked;

      setRowData(tempData);
    }
  };

  const handleSubmit = () => {
    const selectedUserId = rowData
      ?.filter((item) => item?.selected === true)
      ?.map((item) => item?.id?.data);
    const selectedMainJobId = rowData
      ?.filter((item) => item?.selected === true)
      ?.map((item) => item?.selectedData);

    setIsSubmitting(true);
    assignListEmployee({
      main_job_ids: selectedMainJobId,
      user_ids: selectedUserId,
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

  const handleChange = (job, index) => {
    let tempData = JSON.parse(JSON.stringify(rowData));

    tempData[index].selectedData = job?.value;
    console.log(tempData, tempData[index]);
    setRowData(tempData);
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
        <TableContainer>
          <Table aria-label="collapsible table" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  rowSpan={null}
                  sx={{
                    borderRight: "none",
                  }}
                ></TableCell>
                {JobsTableConfig.empColumns.map((c, i) => (
                  <TableCell
                    key={i}
                    align={c.align}
                    rowSpan={c.rowSpan}
                    colSpan={c.colSpan}
                    style={{ ...c.styles }}
                    sx={{
                      fontSize: "1.2rem",
                      paddingTop: "10px",
                      paddingBottom: "10px",

                      borderRight: "none",
                      ...c.styles,
                    }}
                  >
                    <>{c.label}</>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& > *:nth-of-type(even)": {
                  backgroundColor: "#aaaaaa40",
                },
              }}
            >
              {console.log(rowData, "rowData")}
              {rowData?.length > 0 ? (
                rowData.map((row, ii) => (
                  <TableRow key={ii}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="success"
                        key={row.id.data}
                        id={row.id.data}
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 22 } }}
                        checked={row.selected === true ? true : false}
                        onChange={(e) => onSelectHandler(e, ii)}
                        inputProps={{
                          "aria-label": "select desserts",
                        }}
                      />
                    </TableCell>
                    {Object.values(row).map(
                      (single, j) =>
                        single.display && (
                          <TableCell
                            style={{ ...single.styles }}
                            align={single.align}
                            key={j + "" + single.label}
                            size="small"
                            sx={{
                              fontSize: "1rem",
                            }}
                            rowSpan={single.rowSpan}
                            colSpan={single.colSpan}
                          >
                            {single.select ? (
                              <Select
                                isDisabled={
                                  row.selected === true ? false : true
                                }
                                options={allJobOption.map((v) => ({
                                  label: v?.title,
                                  value: v?.job_id,
                                }))}
                                menuPlacement="auto"
                                styles={{
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 1301,
                                  }),
                                }}
                                isMu
                                classNamePrefix="reactselect-select"
                                onChange={(job) => handleChange(job, ii)}
                                isSearchable={true}
                                placeholder="Select Job"
                                noOptionsMessage={() => "No Job Found"}
                                menuPortalTarget={document.querySelector(
                                  "body"
                                )}
                              />
                            ) : (
                              single.data
                            )}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={JobsTableConfig.empColumns.length + 1}
                    style={{
                      fontSize: "1.1rem",
                      textAlign: "center",
                      height: "100px",
                      padding: "6px",
                    }}
                  >
                    <Box
                      sx={{
                        border: "2px solid #444444",
                        borderRadius: (theme) =>
                          `${theme.shape.borderRadius}px`,
                        height: "250px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500,
                        color: "#444444",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "15px",
                          flexDirection: "column",
                        }}
                      >
                        <Box>
                          <img
                            src={noResult}
                            alt="noResult"
                            width="50"
                            height="50"
                          />
                        </Box>
                        <Box
                          sx={{
                            fontSize: "20px",
                            fontWeight: 600,
                            lineHeight: "12px",
                          }}
                        >
                          No Data Available
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <table style={{ width: "100%" }}>
          <tfoot>
            <tr>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: candidateDataCount },
                ]}
                colSpan={JobsTableConfig.empColumns.length}
                count={candidateDataCount}
                rowsPerPage={candidateDataPerPage}
                page={candidatePage}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={(event, newPage) => {
                  dispatch(
                    actions.setCandidatePageConfigData({
                      type: "SET_PAGE",
                      data: newPage,
                    })
                  );
                }}
                onRowsPerPageChange={(event) => {
                  const { value } = event.target;
                  dispatch(
                    actions.setCandidatePageConfigData({
                      type: "SET_DATA_PER_PAGE",
                      data: parseInt(value, 10),
                    })
                  );
                  dispatch(
                    actions.setCandidatePageConfigData({
                      type: "SET_PAGE",
                      data: 0,
                    })
                  );
                }}
                ActionsComponent={TablePaginationActions}
              />
            </tr>
          </tfoot>
        </table>
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
