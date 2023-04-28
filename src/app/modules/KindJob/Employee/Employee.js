import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllPermissionProfile } from "../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../_redux/PermissionProfile/PermissionProfileSlice";
import { getAllEmployee } from "../_redux/Employee/EmployeeCrud";
import { EmployeeSlice } from "../_redux/Employee/EmployeeSlice";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";

const Employee = () => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const { actions: AcPer } = PermissionProfileSlice;

  const { allEmployee, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allEmployee: state.employee.allEmployee,
      filter: state.employee.filter,
      page: state.employee.page,
      dataPerPage: state.employee.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllEmployee(res?.data?.data?.employee_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
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

  const getAllPermissionProfileList = () => {
    getAllPermissionProfile({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(
          AcPer.setAllProfilePermission(
            res?.data?.data?.permission_profile_data?.rows
          )
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllPermissionProfileList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <EmployeeTable allEmployee={allEmployee} getAllData={getAllData} />
    </Paper>
  );
};

export default Employee;
