import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Box } from "@mui/material";

const Completed = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexDirection: "column",
      }}
    >
      <Box>
        <TaskAltIcon
          sx={{
            fontSize: "4rem",
            color: "#25c100",
          }}
        />
      </Box>
      <Box sx={{ fontSize: "20px", fontWeight: "500" }}>Completed!</Box>
    </Box>
  );
};

export default Completed;
