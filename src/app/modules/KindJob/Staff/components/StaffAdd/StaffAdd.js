import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../Utils/utils";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { addStaffToServer, getAllStaff } from "../../../_redux/Staff/StaffCrud";
import { StaffSlice } from "../../../_redux/Staff/StaffSlice";
import StaffAddForm from "./StaffAddForm";

const StaffAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StaffSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage, allProfilePermission } = useSelector(
    (state) => ({
      filter: state.staff.filter,
      page: state.staff.page,
      dataPerPage: state.staff.dataPerPage,
      allProfilePermission: state.permission.allProfilePermission,
    }),
    shallowEqual
  );

  const addStaff = (data) => {
    const dataToServer = cleanObject(data);

    return addStaffToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Staff", "added"),
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
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.staff_data?.count,
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
    <StaffAddForm
      show={show}
      onHide={onHide}
      addStaff={addStaff}
      allProfilePermission={allProfilePermission}
    />
  );
};

export default StaffAdd;
