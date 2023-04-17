/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { generalSlice } from "../../../_redux/general/generalSlice";
import {
  addPermissionToServer,
  getAllPermissionProfile,
} from "../../../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../_redux/PermissionProfile/PermissionProfileSlice";
import { getAllSuperRoles } from "../../PermissionProfile";
import PermissionProfileAddForm from "./PermissionProfileAddForm";

const PermissionProfileAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;
  const { actions: generalActions } = generalSlice;

  const [permissionData, setPermissionData] = useState([]);

  const { filter, page, dataPerPage, allPermissionData } = useSelector(
    (state) => ({
      filter: state.permission.filter,
      page: state.permission.page,
      dataPerPage: state.permission.dataPerPage,
      allPermissionData: state.permission.allPermissionData,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (allPermissionData?.length > 0) {
      setPermissionData(allPermissionData);
    }
  }, [allPermissionData?.length > 0]);

  const addPermissionProfile = (data) => {
    return addPermissionToServer(data).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Permission Profile", "added"),
          type: "success",
        })
      );

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
    });
  };

  return (
    <PermissionProfileAddForm
      show={show}
      onHide={onHide}
      addPermissionProfile={addPermissionProfile}
      getAllSuperRoles={getAllSuperRoles}
      permissionData={permissionData}
      setPermissionData={setPermissionData}
    />
  );
};

export default PermissionProfileAdd;
