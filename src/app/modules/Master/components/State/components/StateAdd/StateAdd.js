import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addStateToServer,
  getAllState,
} from "../../../../../_redux/State/StateCrud";
import { StateSlice } from "../../../../../_redux/State/StateSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import StateAddForm from "./StateAddForm";

const StateAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StateSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.state.filter,
      page: state.state.page,
      dataPerPage: state.state.dataPerPage,
    }),
    shallowEqual
  );

  const addState = (data) => {
    const dataToServer = cleanObject(data);

    return addStateToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("State", "added"),
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

  return <StateAddForm show={show} onHide={onHide} addState={addState} />;
};

export default StateAdd;
