import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllRole } from "../../../_redux/Role/RoleCrud";
import { RoleSlice } from "../../../_redux/Role/RoleSlice";
import RoleTable from "./components/RoleTable/RoleTable";

const Role = () => {
  const dispatch = useDispatch();
  const { actions } = RoleSlice;

  const { allRole, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allRole: state.role.allRole,
      filter: state.role.filter,
      page: state.role.page,
      dataPerPage: state.role.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllRole({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllRole(res?.data?.data?.role_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.role_data?.count,
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

  console.log(allRole, "allRole");

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <RoleTable allRole={allRole} getAllData={getAllData} />
    </Paper>
  );
};

export default Role;
