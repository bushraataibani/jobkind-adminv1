import { Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";

const AssignJobConfirmationModal = ({
  showConfirmationModal,
  setShowConfirmationModal,
  isSubmitting,
  handleAssign,
}) => {
  const { activeJobData } = useSelector(
    (state) => ({
      activeJobData: state.appliedJob.activeJobData,
    }),
    shallowEqual
  );

  return (
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
        style={{
          padding: "20px 24px 8px 20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
          fontWeight: 400,
        }}
      >
        {`Are you sure you want to assign ${activeJobData?.job_title &&
          activeJobData?.job_title !== undefined &&
          activeJobData?.job_title} job?`}
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
        <BootstrapButton
          variant="success"
          type="submit"
          label="Assign"
          labelWhenSubmitting="Assigning"
          isSubmitting={isSubmitting}
          onClick={() => handleAssign()}
          disabled={isSubmitting}
        />
      </DialogActions>
    </Dialog>
  );
};

export default AssignJobConfirmationModal;
