import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Button } from "react-bootstrap";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";

const JobsDescription = ({ showDescModal, selectedDesc, setShowDescModal }) => {
  return (
    <Dialog
      open={showDescModal}
      scroll={"paper"}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogCloseTitle onClose={() => setShowDescModal(false)}>
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Job Description
        </Box>
      </DialogCloseTitle>
      <DialogContent dividers>
        <Box> {selectedDesc?.job_description.dataIs}</Box>
      </DialogContent>
      <DialogActions>
        <Button variant="secondary" onClick={() => setShowDescModal(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobsDescription;
