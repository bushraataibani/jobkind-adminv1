import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { addRoleToServer, getAllRole } from "../../../_redux/Role/RoleCrud";
import { RoleSlice } from "../../../_redux/Role/RoleSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import RoleAddForm from "./RoleAddForm";

const RoleAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = RoleSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.role.filter,
      page: state.role.page,
      dataPerPage: state.role.dataPerPage,
    }),
    shallowEqual
  );

  const addRole = (data) => {
    const dataToServer = cleanObject(data);

    return addRoleToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Role", "added"),
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

  return <RoleAddForm show={show} onHide={onHide} addRole={addRole} />;
};

export default RoleAdd;
