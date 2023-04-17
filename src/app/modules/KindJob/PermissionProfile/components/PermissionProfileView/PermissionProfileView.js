/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../Utils/utils";
import {
  addPermissionToServer,
  getAllPermissionProfile,
  getPermissionProfileByID,
} from "../../../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../_redux/PermissionProfile/PermissionProfileSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import PermissionProfileViewForm from "./PermissionProfileViewForm";
import { getAllSuperRoles } from "../../PermissionProfile";

const PermissionProfileView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;
  const { actions: generalActions } = generalSlice;

  const [permissionData, setPermissionData] = useState([]);
  // const [selectedPermission, setSelectedPermission] = useState([]);

  const {
    selectedProfilePermission,
    filter,
    page,
    dataPerPage,
    allPermissionData,
  } = useSelector(
    (state) => ({
      selectedProfilePermission: state.permission.selectedProfilePermission,
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

  const savePermissionProfile = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addPermissionToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Permission Profile", "updated"),
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

  const getPermissionByID = () => {
    return getPermissionProfileByID(id)
      .then((res) => {
        setPermissionData(res?.data?.data?.permission_data);
        // setSelectedPermission(res?.data?.data?.permission_data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    if (id !== null) {
      getPermissionByID();
    }
  }, [id]);

  return (
    <>
      {selectedProfilePermission && show && (
        <PermissionProfileViewForm
          show={show}
          onHide={onHide}
          savePermissionProfile={savePermissionProfile}
          selectedPermissionProfile={selectedProfilePermission}
          permissionData={permissionData}
          getAllSuperRoles={getAllSuperRoles}
          setPermissionData={setPermissionData}
        />
      )}
    </>
  );
};

export default PermissionProfileView;
