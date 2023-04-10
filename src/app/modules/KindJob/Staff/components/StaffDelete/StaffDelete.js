import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../_redux/general/generalSlice";
import {
  deleteStaffFromServer,
  getAllStaff,
} from "../../../_redux/Staff/StaffCrud";
import { StaffSlice } from "../../../_redux/Staff/StaffSlice";

const StaffDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StaffSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedStaff, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedStaff: state.staff.selectedStaff,
      filter: state.staff.filter,
      page: state.staff.page,
      dataPerPage: state.staff.dataPerPage,
    }),
    shallowEqual
  );

  const deleteStaff = () => {
    return deleteStaffFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Staff", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllStaff({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllStaff(res?.data?.data?.staffs_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.staffs_data?.count,
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
      deleteHandler={deleteStaff}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Staff"
      selectedData={selectedStaff && selectedStaff?.title?.data}
    />
  );
};

export default StaffDelete;
