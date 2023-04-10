import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllStaff } from "../_redux/Staff/StaffCrud";
import { StaffSlice } from "../_redux/Staff/StaffSlice";
import StaffTable from "./components/StaffTable/StaffTable";

const Staff = () => {
  const dispatch = useDispatch();
  const { actions } = StaffSlice;

  const { allStaff, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allStaff: state.staff.allStaff,
      filter: state.staff.filter,
      page: state.staff.page,
      dataPerPage: state.staff.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllStaff({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllStaff(res?.data?.data?.staff_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.staff_data?.count,
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
      <StaffTable allStaff={allStaff} getAllData={getAllData} />
    </Paper>
  );
};

export default Staff;
