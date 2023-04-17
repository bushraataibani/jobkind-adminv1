/* eslint-disable react-hooks/exhaustive-deps */
import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getAllPermission,
  getAllPermissionProfile,
} from "../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../_redux/PermissionProfile/PermissionProfileSlice";
import PermissionProfileTable from "./components/PermissionProfileTable/PermissionProfileTable";

export const getAllSuperRoles = [
  {
    Title: "Administrator",
    Id: 4,
  },
  { Title: "Staff", Id: 5 },
];

const PermissionProfile = () => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;

  const { allProfilePermission, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allProfilePermission: state.permission.allProfilePermission,
      filter: state.permission.filter,
      page: state.permission.page,
      dataPerPage: state.permission.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllPermissionProfile({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllProfilePermission(
            res?.data?.data?.permission_profile_data?.rows
          )
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.permission_profile_data?.count,
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

  const getPermissionList = () => {
    getAllPermission({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(
          actions.setAllPermissionData(res?.data?.data?.permission_data)
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getPermissionList();
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <PermissionProfileTable
        allProfilePermission={allProfilePermission}
        getAllData={getAllData}
      />
    </Paper>
  );
};

export default PermissionProfile;
