import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Spinner } from "react-bootstrap";

const CandidateLoginWidget = ({
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
            {state?.total_candidate_login && loading ? (
              <Spinner
                animation="border"
                style={{ width: "12px", height: "12px" }}
              />
            ) : (
              state?.total_candidate_login
            )}
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
            Total Candidate Login
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateLoginWidget;
