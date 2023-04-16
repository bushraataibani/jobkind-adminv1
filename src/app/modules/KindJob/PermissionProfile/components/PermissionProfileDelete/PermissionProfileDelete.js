import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../_redux/general/generalSlice";
import {
  deletePermissionFromServer,
  getAllPermissionProfile,
} from "../../../_redux/PermissionProfile/PermissionProfileCrud";
import { PermissionProfileSlice } from "../../../_redux/PermissionProfile/PermissionProfileSlice";

const PermissionProfileDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PermissionProfileSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedProfilePermission, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedProfilePermission: state.permission.selectedProfilePermission,
      filter: state.permission.filter,
      page: state.permission.page,
      dataPerPage: state.permission.dataPerPage,
    }),
    shallowEqual
  );

  const deletePermissionProfile = () => {
    return deletePermissionFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Permission Profile", "deleted"),
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
            actions.setAllPermissionProfile(
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
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deletePermissionProfile}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Permission Profile"
      selectedData={
        selectedProfilePermission && selectedProfilePermission?.title?.data
      }
    />
  );
};

export default PermissionProfileDelete;
