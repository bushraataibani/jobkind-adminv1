import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const TotalJobWidget = ({
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
  // const isDownlg = useMediaQuery(theme.breakpoints.down("lg"));
  // const isUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  // const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  // const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  // const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
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
        gridRow: "span 2",
        overflowY: "auto",
      }}
      style={{ ...rootStyles }}
    >
      <Box
        sx={{
          padding: "5px",
          justifyContent: "left",
          width: "100%",
          display: "flex",
        }}
        onClick={onClickIcon}
      >
        <Box
          sx={{
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "42px",
            height: "42px",
            backgroundColor: textColor,
          }}
        >
          {Icon}
        </Box>
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#777",
            marginLeft: "10px",
            alignSelf: "center",
          }}
        >
          Total Jobs
        </span>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Box
          sx={{
            color: "#777",
            textAlign: "center",
            lineHeight: 1.2,
            transition: "opacity 0.3s ease",
          }}
          className={"font-weight-bold font-size-h6 "}
        >
          Jobs
        </Box> */}
        {/* {loading ? (
          <Spinner animation="border" style={{ marginTop: "10px" }} />
        ) : ( */}
        <Box
          sx={{
            fontSize: "3rem",
            fontWeight: 600,
            lineHeight: 1,
            marginTop: "8px",
          }}
        >
          2000
        </Box>
        {/* )} */}
      </Box>
    </Box>
  );
};

export default TotalJobWidget;
