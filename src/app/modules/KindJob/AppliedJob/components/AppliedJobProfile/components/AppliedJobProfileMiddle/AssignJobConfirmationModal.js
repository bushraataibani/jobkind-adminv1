import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  getAllJobAppyEmployee,
  setJobApplyEmployeeStatus,
} from "../../../../../_redux/AppliedJob/AppliedJobCrud";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppliedJobSlice } from "../../../../../_redux/AppliedJob/AppliedJobSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import { successMessage } from "../../../../../../Helpers/Alert/messages";

const AssignJobConfirmationModal = ({
  showConfirmationModal,
  setShowConfirmationModal,
  userJobApplyId,
}) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.appliedJob.filter,
      page: state.appliedJob.page,
      dataPerPage: state.appliedJob.dataPerPage,
    }),
    shallowEqual
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllJobAppyEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllAppliedJob(res?.data?.data?.employee_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  const handleClick = () => {
    setIsSubmitting(true);
    let obj = {
      user_job_apply_id: parseInt(userJobApplyId),
      status: 2,
      reason: "",
    };
    setJobApplyEmployeeStatus(obj)
      .then((res) => {
        dispatch(
          generalActions.pushNewAlert({
            show: true,
            heading: "Success",
            message: successMessage("Assigned Job", "Successfully"),
            type: "success",
          })
        );

        getAllData();
      })
      .catch((error) => {
        console.error(error);
        dispatch(actions.setLoading(false));
      })
      .finally(() => {
        setShowConfirmationModal(false);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Dialog
        open={showConfirmationModal}
        scroll="paper"
        fullWidth={true}
        PaperProps={{
          style: {
            minHeight: "200px",
            minWidth: "32%",
            width: "33%",
          },
        }}
      >
        <DialogContent
          dividers={false}
          style={{ padding: "20px 24px 8px 20px" }}
        >
          Are you sure you want to assign job?
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 8px 20px 8px",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              onClick={() => handleClick()}
              disabled={isSubmitting}
              className="d-flex align-items-center"
              style={{
                whiteSpace: "nowrap",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              {isSubmitting && (
                <CircularProgress
                  size={20}
                  thickness={3.3}
                  color="inherit"
                  className="mr-1"
                />
              )}

              <span style={{ textAlign: "center", width: "100%" }}>
                {isSubmitting ? "Assigning" : "Assign"}
              </span>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignJobConfirmationModal;
