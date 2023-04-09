import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteStateFromServer,
  getAllState,
} from "../../../_redux/State/StateCrud";
import { StateSlice } from "../../../_redux/State/StateSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const StateDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StateSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedState, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedState: state.state.selectedState,
      filter: state.state.filter,
      page: state.state.page,
      dataPerPage: state.state.dataPerPage,
    }),
    shallowEqual
  );

  const deleteState = () => {
    return deleteStateFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("State", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllState({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllState(res?.data?.data?.state_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.state_data?.count,
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
      deleteHandler={deleteState}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="State"
      selectedData={selectedState && selectedState?.title?.data}
    />
  );
};

export default StateDelete;
