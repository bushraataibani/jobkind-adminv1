import { Box } from "@mui/system";
import React from "react";

const FieldSet = ({ children, title, containerStyles, titleStyles }) => {
  return (
    <Box
      component="fieldset"
      sx={{
        border: "1px solid #ccc",
        padding: "5px 10px 0px 10px",
        margin: "5px 0px",
        borderRadius: (theme) => `${theme.shape.borderRadius}px`,
        ...containerStyles,
      }}
    >
      <Box
        component="legend"
        sx={{
          fontSize: "1.2rem",
          fontWeight: 600,
          width: "auto",
          margin: "-5px",

          padding: "5px",
          ...titleStyles,
          // color: theme.palette.primary.main,
        }}
      >
        {title}
      </Box>
      {children}
    </Box>
  );
};

export default FieldSet;
