import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const CompanyLoginWidget = ({
  reload,
  IconBackColors,
  loading,
  Icon,
  state,
  styles: { rootStyles = {}, textColor } = {},
  onClickCard,
  onClickIcon,
}) => {
  const theme = useTheme();

  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        height: "100%",
        cursor: onClickCard ? "pointer" : "initial",
        padding: {
          xs: "8px",
          lg: "12px",
        },
        gap: {
          xs: "8px",
          lg: "12px",
        },
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.3)",
        gridColumn: isUpLg ? "span 6" : "span 6",
        gridColumnStart: isUpLg ? "span 3" : isDownMd ? "span 6" : "span 6",
        gridRow: "span 1",
        overflowY: "auto",
      }}
      style={{ ...rootStyles }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          width: "100%",
          padding: "5px",
          gap: "20px",
        }}
        onClick={onClickIcon}
      >
        <Box
          sx={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "50px",
            backgroundColor: textColor,
          }}
        >
          {Icon}
        </Box>
        <Box>
          <Box
            sx={{
              fontSize: "1.2rem",
              color: "#212b3",
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            {state?.total_company_login}
          </Box>
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "#777",
              marginTop: "8px",
              textAlign: "left",
            }}
          >
            Total Company Login
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyLoginWidget;
