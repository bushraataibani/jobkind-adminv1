import { Alert } from "@mui/material";
import React from "react";

const MUIAlert = ({ severity = "info", sx = {}, children }) => {
  return (
    <Alert
      severity={severity}
      sx={{
        width: "100%",
        alignItems: "center",
        marginBottom: "10px",
        ...sx,
      }}
    >
      {children}
    </Alert>
  );
};

export default MUIAlert;
