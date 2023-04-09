import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteSpecializationFromServer,
  getAllSpecialization,
} from "../../../_redux/Specialization/SpecializationCrud";
import { SpecializationSlice } from "../../../_redux/Specialization/SpecializationSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const SpecializationDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SpecializationSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedSpecialization, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedSpecialization: state.specialization.selectedSpecialization,
      filter: state.specialization.filter,
      page: state.specialization.page,
      dataPerPage: state.specialization.dataPerPage,
    }),
    shallowEqual
  );

  const deleteSpecialization = () => {
    return deleteSpecializationFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Specialization", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllSpecialization({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(
            actions.setAllSpecialization(
              res?.data?.data?.specializations_data?.rows
            )
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.specializations_data?.count,
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
      deleteHandler={deleteSpecialization}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Specialization"
      selectedData={
        selectedSpecialization && selectedSpecialization?.title?.data
      }
    />
  );
};

export default SpecializationDelete;
