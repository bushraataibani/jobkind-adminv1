import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  addRoleToServer,
  getAllRole,
} from "../../../../../_redux/Role/RoleCrud";
import { RoleSlice } from "../../../../../_redux/Role/RoleSlice";
import RoleViewForm from "./RoleViewForm";

const RoleView = ({ show, id, onHide }) => {
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

  const saveRole = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addRoleToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Role", "updated"),
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
      {selectedRole && show && (
        <RoleViewForm
          show={show}
          onHide={onHide}
          saveRole={saveRole}
          selectedRole={selectedRole}
        />
      )}
    </>
  );
};

export default RoleView;
