import CloseIcon from "@mui/icons-material/Close";
import { DialogTitle, IconButton } from "@mui/material";
import React from "react";

const DialogCloseTitle = ({
  disableTypography = true,
  style = {},
  children,
  onClose,
  isCloseButtonDisabled = false,
}) => {
  return (
    <DialogTitle
      // disableTypography={disableTypography}
      sx={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        "& > div:first-of-type": {
          flex: 1,
        },
        ...style,
      }}
    >
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          sx={{
            // position: "absolute",
            // right: "8px",
            // top: "7px",
            color: (theme) => theme.palette.grey[500],
            marginRight: "-12px",
          }}
          onClick={onClose}
          disabled={isCloseButtonDisabled}
        >
          <CloseIcon style={{ fontSize: "1.8rem" }} />
        </IconButton>
      )}
    </DialogTitle>
  );
};

export default DialogCloseTitle;
