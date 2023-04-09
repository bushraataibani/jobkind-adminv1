import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addDepartmentToServer,
  getAllDepartment,
} from "../../../_redux/Department/DepartmentCrud";
import { DepartmentSlice } from "../../../_redux/Department/DepartmentSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import DepartmentAddForm from "./DepartmentAddForm";

const DepartmentAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = DepartmentSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.department.filter,
      page: state.department.page,
      dataPerPage: state.department.dataPerPage,
    }),
    shallowEqual
  );

  const addDepartment = (data) => {
    const dataToServer = cleanObject(data);

    return addDepartmentToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Department", "added"),
          type: "success",
        })
      );

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
    });
  };

  return (
    <DepartmentAddForm
      show={show}
      onHide={onHide}
      addDepartment={addDepartment}
    />
  );
};

export default DepartmentAdd;
