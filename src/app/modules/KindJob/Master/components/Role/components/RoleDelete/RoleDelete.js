import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  deleteRoleFromServer,
  getAllRole,
} from "../../../../../_redux/Role/RoleCrud";
import { RoleSlice } from "../../../../../_redux/Role/RoleSlice";

const RoleDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = RoleSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedRole, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedRole: state.role.selectedRole,
      filter: state.role.filter,
      page: state.role.page,
      dataPerPage: state.role.dataPerPage,
    }),
    shallowEqual
  );

  const deleteRole = () => {
    return deleteRoleFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Role", "deleted"),
          type: "success",
        })
      );

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
    });
  };

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteRole}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Role"
      selectedData={selectedRole && selectedRole?.title?.data}
    />
  );
};

export default RoleDelete;
