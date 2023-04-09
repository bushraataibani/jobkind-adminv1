import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteCollegeFromServer,
  getAllCollege,
} from "../../../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../../../_redux/College/CollegeSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";

const CollegeDelete = ({ show, id, onHide }) => {
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

  const deleteCollege = () => {
    return deleteCollegeFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("College", "deleted"),
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
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.collage_data?.count,
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
      deleteHandler={deleteCollege}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="College"
      selectedData={selectedCollege && selectedCollege?.collage_name?.data}
    />
  );
};

export default CollegeDelete;
