import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const MuiButton = ({ icon, tooltip, text, onClick, btnStyles = {} }) => {
  return (
    <Tooltip disableInteractive={true} arrow title={tooltip}>
      <Button
        size="large"
        variant="contained"
        color="inherit"
        style={{
          color: "black",
          marginRight: "10px",
          minWidth: "auto",
          ...btnStyles,
        }}
        onClick={onClick}
      >
        {icon}
        <span style={{ marginLeft: "5px" }}>{text}</span>
      </Button>
    </Tooltip>
  );
};

export default MuiButton;
