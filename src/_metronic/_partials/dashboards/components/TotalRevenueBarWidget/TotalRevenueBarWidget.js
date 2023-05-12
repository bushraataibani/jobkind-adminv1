import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const TotalRevenueBarWidget = ({
  reload,
  IconBackColors,
  loading,
  Icon,
  monthlyRevenue,
  styles: { rootStyles = {}, textColor } = {},
  onClickCard,
  onClickIcon,
}) => {
  const theme = useTheme();

  const isUpLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  // const isUpXl = useMediaQuery(theme.breakpoints.up("xl"));
  // const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  // const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
  // const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  // const isUpSm = useMediaQuery(theme.breakpoints.up("sm"));

  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  const labels = monthlyRevenue?.map((item) => item?.title);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Revenue",
        data: monthlyRevenue?.map((item) => item?.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        cursor: onClickCard ? "pointer" : "initial",
        boxShadow: "0px 1px 2px 0px rgba(0,0,0,0.3)",
        padding: {
          xs: "8px",
          lg: "12px",
        },
        gap: {
          xs: "8px",
          lg: "12px",
        },
        gridColumn: isUpLg ? "span 12" : "span 12",
        gridColumnStart: isUpLg ? "span 12" : isDownLg ? "span 12" : "span 12",
        gridRow: "span 6",
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
            fontSize: "1.2rem",
            fontWeight: 400,
            color: "#777",
            marginLeft: "10px",
            alignSelf: "center",
          }}
        >
          Total Revenue
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
        <Box sx={{ width: "100%", height: "350px" }}>
          <Bar style={{ width: "100%" }} options={options} data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default TotalRevenueBarWidget;
