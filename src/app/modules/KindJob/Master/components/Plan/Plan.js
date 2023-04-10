import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllPlan } from "../../../_redux/Plan/PlanCrud";
import { PlanSlice } from "../../../_redux/Plan/PlanSlice";
import PlanTable from "./components/PlanTable/PlanTable";

const Plan = () => {
  const dispatch = useDispatch();
  const { actions } = PlanSlice;

  const { allPlan, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allPlan: state.plan.allPlan,
      filter: state.plan.filter,
      page: state.plan.page,
      dataPerPage: state.plan.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllPlan({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllPlan(res?.data?.data?.plan_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.plan_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PlanTable allPlan={allPlan} getAllData={getAllData} />
    </Paper>
  );
};

export default Plan;
