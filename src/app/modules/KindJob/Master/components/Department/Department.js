/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllDepartment } from "../../../_redux/Department/DepartmentCrud";
import { DepartmentSlice } from "../../../_redux/Department/DepartmentSlice";
import { getAllRole } from "../../../_redux/Role/RoleCrud";
import { RoleSlice } from "../../../_redux/Role/RoleSlice";
import DepartmentTable from "./components/DepartmentTable/DepartmentTable";

const Department = () => {
  const dispatch = useDispatch();
  const { actions } = DepartmentSlice;
  const { actions: roleAc } = RoleSlice;

  const { allDepartment, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allDepartment: state.department.allDepartment,
      filter: state.department.filter,
      page: state.department.page,
      dataPerPage: state.department.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllDepartment({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllDepartment(res?.data?.data?.department_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.department_data?.count,
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
  }, [filter, page, dataPerPage]);

  const getAllRoles = () => {
    getAllRole({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(roleAc.setAllRole(res?.data?.data?.role_data?.rows));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DepartmentTable allDepartment={allDepartment} getAllData={getAllData} />
    </Paper>
  );
};

export default Department;
