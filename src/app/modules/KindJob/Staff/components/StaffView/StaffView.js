import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { addStaffToServer, getAllStaff } from "../../../_redux/Staff/StaffCrud";
import { StaffSlice } from "../../../_redux/Staff/StaffSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import StaffViewForm from "./StaffViewForm";

const StaffView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StaffSlice;
  const { actions: generalActions } = generalSlice;

  const {
    selectedStaff,
    filter,
    page,
    dataPerPage,
    allProfilePermission,
  } = useSelector(
    (state) => ({
      selectedStaff: state.staff.selectedStaff,
      filter: state.staff.filter,
      page: state.staff.page,
      dataPerPage: state.staff.dataPerPage,
      allProfilePermission: state.permission.allProfilePermission,
    }),
    shallowEqual
  );

  const saveStaff = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));

    return addStaffToServer(data).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Staff", "updated"),
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
          dispatch(actions.setAllStaff(res?.data?.data?.staff_data?.rows));
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
      {selectedStaff && show && (
        <StaffViewForm
          show={show}
          onHide={onHide}
          saveStaff={saveStaff}
          selectedStaff={selectedStaff}
          allProfilePermission={allProfilePermission}
        />
      )}
    </>
  );
};

export default StaffView;
