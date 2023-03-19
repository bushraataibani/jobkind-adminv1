import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addCollegeToServer,
  getAllCollege,
} from "../../../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../../../_redux/College/CollegeSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import CollegeViewForm from "./CollegeViewForm";

const CollegeView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CollegeSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedCollege, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedCollege: state.college.selectedCollege,
      filter: state.college.filter,
      page: state.college.page,
      dataPerPage: state.college.dataPerPage,
    }),
    shallowEqual
  );

  const saveCollege = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addCollegeToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("College", "updated"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllCollege({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllCollege(res?.data?.data?.collage_data?.rows));
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
      {selectedCollege && show && (
        <CollegeViewForm
          show={show}
          onHide={onHide}
          saveCollege={saveCollege}
          selectedCollege={selectedCollege}
        />
      )}
    </>
  );
};

export default CollegeView;
