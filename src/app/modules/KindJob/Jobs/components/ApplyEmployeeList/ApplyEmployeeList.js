import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import TableCustomSelect from "../../../../Helpers/Table/TableCustomSelect";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { assignListEmployee, getAllApplyEmployeeData } from "../../../_redux/Jobs/JobsCrud";
import { jobsSlice } from "../../../_redux/Jobs/JobsSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import JobsTableConfig from "../../JobsTableConfig";
import EnhancedTableToolbar from "../../../../Helpers/EnhancedTableToolbar/EnhancedTableToolbar";

const ApplyEmployeeList = ({
    showCandidateModal,
    setShowApplyEmployeeModal,
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
    const [rowData, setRowData] = useState([]);

    const {
        applyEmployeePage,
        applyEmployeeDataPerPage,
        applyEmployeeDataCount,
        applyEmployeeFilter,
        applyEmployeeIsLoading
    } = useSelector(
        (state) => ({
            applyEmployeePage: state.jobs.applyEmployeePage,
            applyEmployeeDataPerPage: state.jobs.applyEmployeeDataPerPage,
            applyEmployeeDataCount: state.jobs.applyEmployeeDataCount,
            applyEmployeeFilter: state.jobs.applyEmployeeFilter,
            applyEmployeeIsLoading: state.jobs.applyEmployeeIsLoading,
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
                setShowApplyEmployeeModal(false);
                getAllData();
            })
            .catch((err) => setIsSubmitting(false));
    };

    const getAllApplyEmployeeDataData = () => {
        dispatch(
            actions.setApplyEmployeePageConfigData({
                type: "SET_IS_LOADING",
                data: true,
            })
        );
        getAllApplyEmployeeData({
            search: applyEmployeeFilter?.search?.keyword
                ? applyEmployeeFilter?.search?.keyword
                : "",
            page_no: applyEmployeePage,
            page_record: applyEmployeeDataPerPage,
            main_job_id: selectedRow?.main_job_id,
        })
            .then((res) => {
                dispatch(actions.setAllApplyEmployee(res?.data?.data?.employee_data?.rows));
                const data = res?.data?.data?.employee_data?.rows.map((cand, i) =>
                    JobsTableConfig.getFormattedApplyEmployeeData(cand, i)
                );
                setRowData(data);
                dispatch(
                    actions.setApplyEmployeePageConfigData({
                        type: "SET_DATA_COUNT",
                        data: res?.data?.data?.employee_data?.count,
                    })
                );
            })
            .catch((error) => console.error(error))
            .finally(() => {
                dispatch(
                    actions.setApplyEmployeePageConfigData({
                        type: "SET_IS_LOADING",
                        data: false,
                    })
                );
            });
    };

    useEffect(() => {
        if (showCandidateModal) {
            getAllApplyEmployeeDataData();
        }

        // eslint-disable-next-line
    }, [showCandidateModal, applyEmployeePage, applyEmployeeDataCount, applyEmployeeDataPerPage, applyEmployeeFilter]);

    return (
        <Dialog
            open={showCandidateModal}
            scroll={"paper"}
            maxWidth="lg"
            fullWidth={true}
        >
            <DialogCloseTitle onClose={() => setShowApplyEmployeeModal(false)}>
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
                    refreshHandler={() => getAllApplyEmployeeDataData()}
                    showSearch={true}
                    filter={applyEmployeeFilter}
                    refreshWhenWholeFilterChange={true}
                    searchConfig={{
                        searchKeys: ["collage_id", "collage_name"],
                        filterValue: applyEmployeeFilter?.search?.keyword || "",
                        setSearchConfig: (data) => {
                            dispatch(actions.setApplyEmployeeFilter(data));
                            dispatch(
                                actions.setApplyEmployeePageConfigData({
                                    type: "SET_PAGE",
                                    data: 0,
                                })
                            );
                        },
                    }}
                />

                <TableCustomSelect
                    page={applyEmployeePage}
                    dataCount={applyEmployeeDataCount}
                    dataPerPage={applyEmployeeDataPerPage}
                    rowData={rowData}
                    columnsConfig={JobsTableConfig.applyEmployeeColumns}
                    numCols={JobsTableConfig.applyEmployeeColumns.length}
                    showViewButton={false}
                    showDeleteButton={false}
                    selectedCheckbox={selected}
                    setSelectedCheckbox={setSelected}
                    handleSetPage={(newPage) => {
                        dispatch(
                            actions.setApplyEmployeePageConfigData({
                                type: "SET_PAGE",
                                data: newPage,
                            })
                        );
                    }}
                    handleNoOfRowsPerPage={(value) => {
                        dispatch(
                            actions.setApplyEmployeePageConfigData({
                                type: "SET_DATA_PER_PAGE",
                                data: parseInt(value, 10),
                            })
                        );
                        dispatch(
                            actions.setApplyEmployeePageConfigData({ type: "SET_PAGE", data: 0 })
                        );
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="secondary"
                    onClick={() => setShowApplyEmployeeModal(false)}
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

export default ApplyEmployeeList;
