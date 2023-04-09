import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addDepartmentToServer,
  getAllDepartment,
} from "../../../../../_redux/Department/DepartmentCrud";
import { DepartmentSlice } from "../../../../../_redux/Department/DepartmentSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import DepartmentViewForm from "./DepartmentViewForm";

const DepartmentView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = DepartmentSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedDepartment, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedDepartment: state.department.selectedDepartment,
      filter: state.department.filter,
      page: state.department.page,
      dataPerPage: state.department.dataPerPage,
    }),
    shallowEqual
  );

  const saveDepartment = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addDepartmentToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Department", "updated"),
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
      {selectedDepartment && show && (
        <DepartmentViewForm
          show={show}
          onHide={onHide}
          saveDepartment={saveDepartment}
          selectedDepartment={selectedDepartment}
        />
      )}
    </>
  );
};

export default DepartmentView;
