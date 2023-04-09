import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteDepartmentFromServer,
  getAllDepartment,
} from "../../../_redux/Department/DepartmentCrud";
import { DepartmentSlice } from "../../../_redux/Department/DepartmentSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const DepartmentDelete = ({ show, id, onHide }) => {
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

  const deleteDepartment = () => {
    return deleteDepartmentFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Department", "deleted"),
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
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteDepartment}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Department"
      selectedData={
        selectedDepartment && selectedDepartment?.department_name?.data
      }
    />
  );
};

export default DepartmentDelete;
