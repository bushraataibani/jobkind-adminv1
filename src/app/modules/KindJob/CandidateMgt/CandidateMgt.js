import { Paper } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import CandidateMgtTable from "./components/CandidateMgtTable/CandidateMgtTable";

const CandidateMgt = () => {
  const { allCandidateMgt } = useSelector(
    (state) => ({
      allCandidateMgt: state.candidateMgt.allCandidateMgt,
      filter: state.candidateMgt.filter,
      page: state.candidateMgt.page,
      dataPerPage: state.candidateMgt.dataPerPage,
    }),
    shallowEqual
  );

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CandidateMgtTable allCandidateMgt={allCandidateMgt} />
    </Paper>
  );
};

export default CandidateMgt;
