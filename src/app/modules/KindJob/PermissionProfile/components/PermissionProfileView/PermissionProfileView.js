/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../Utils/utils";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { addPermissionToServer, getAllPermissionProfile } from "../../../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../_redux/PermissionProfile/PermissionProfileSlice";
import PermissionProfileViewForm from "./PermissionProfileViewForm";

const PermissionProfileView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;
  const { actions: generalActions } = generalSlice;

  const [permissionData, setPermissionData] = useState([]);


  const {
    selectedProfilePermission,
    filter,
    page,
    dataPerPage,
    allPermissionData,
    allRole
  } = useSelector(
    (state) => ({
      selectedProfilePermission: state.permission.selectedProfilePermission,
      filter: state.permission.filter,
      page: state.permission.page,
      dataPerPage: state.permission.dataPerPage,
      allPermissionData: state.permission.allPermissionData,
      allRole: state.role.allRole,
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
          dispatch(actions.setAllPermissionProfile(res?.data?.data?.permission_data?.rows));
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
    <>
      {selectedProfilePermission && show && (
        <PermissionProfileViewForm
          show={show}
          onHide={onHide}
          savePermissionProfile={savePermissionProfile}
          selectedPermissionProfile={selectedProfilePermission}
          permissionData={permissionData}
          allRole={allRole}
          setPermissionData={setPermissionData}
        />
      )}
    </>
  );
};

export default PermissionProfileView;
