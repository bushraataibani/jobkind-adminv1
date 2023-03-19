import { Snackbar } from "@mui/material";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../Helpers/DeleteModal/DeleteModal";
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

  const { selectedCollege } = useSelector(
    (state) => ({
      selectedCollege: state.college.selectedCollege,
    }),
    shallowEqual
  );

  const deleteCollege = () => {
    return deleteCollegeFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Master", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllCollege()
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
