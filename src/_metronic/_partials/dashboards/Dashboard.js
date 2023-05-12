import { Box, Fab, Tooltip, styled } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useState } from "react";
import MixedWidget from "./components/MixedWidget/MixedWidget";
import {
  getAllMontlyRevenue,
  getAllStatData,
} from "../../../app/modules/KindJob/_redux/Dashboard/DashboardCrud";
import { useEffect } from "react";

const Gridlayout = styled("div")(({ theme }) => {
  return {
    display: "grid",
    gridTemplateColumns: "repeat(12,1fr)",
    gridTemplateRows: "100px 100px 100px 100px 100px",
    gridGap: "10px",
    padding: "5px",
    backgroundColor: "#eef0f8",

    [theme.breakpoints.up("lg")]: {
      gridGap: "10px",
      padding: "15px",
    },
  };
});

export const Dashboard = () => {
  const [state, setstate] = useState({});
  const [monthlyRevenue, setMontlyRevenue] = useState([]);
  const [loading, setloading] = useState(true);
  const [reload, setReload] = useState(false);

  const getAllData = () => {
    setloading(true);
    setReload(true);
    getAllStatData()
      .then(({ data }) => {
        setstate(data?.data);
      })
      .finally(() => {
        setloading(false);
        setReload(false);
      });
  };
  useEffect(() => {
    getAllData();
  }, []);

  const getAllMonthlyRevenueData = () => {
    setloading(true);
    setReload(true);
    getAllMontlyRevenue()
      .then(({ data }) => {
        setMontlyRevenue(data?.data?.chart_data);
      })
      .finally(() => {
        setloading(false);
        setReload(false);
      });
  };
  useEffect(() => {
    getAllData();
    getAllMonthlyRevenueData();
  }, []);

  return (
    <Box>
      <Gridlayout>
        <MixedWidget
          state={state}
          loading={loading}
          reload={reload}
          monthlyRevenue={monthlyRevenue}
        />
      </Gridlayout>
      <Tooltip title="Reload Dashboard" placement="left">
        <Fab
          aria-label="add"
          style={{
            position: "absolute",
            bottom: "2%",
            right: "1%",
            zIndex: 999,
            backgroundColor: "black",
            color: "white",
          }}
          // onClick={getAllData}
        >
          <ReplayIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};
