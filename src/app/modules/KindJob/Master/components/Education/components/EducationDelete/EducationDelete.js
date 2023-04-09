import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteEducationFromServer,
  getAllEducation,
} from "../../../_redux/Education/EducationCrud";
import { EducationSlice } from "../../../_redux/Education/EducationSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const EducationDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EducationSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedEducation, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedEducation: state.education.selectedEducation,
      filter: state.education.filter,
      page: state.education.page,
      dataPerPage: state.education.dataPerPage,
    }),
    shallowEqual
  );

  const deleteEducation = () => {
    return deleteEducationFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Education", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllEducation({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(
            actions.setAllEducation(res?.data?.data?.educations_data?.rows)
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.educations_data?.count,
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
      deleteHandler={deleteEducation}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Education"
      selectedData={selectedEducation && selectedEducation?.title?.data}
    />
  );
};

export default EducationDelete;
