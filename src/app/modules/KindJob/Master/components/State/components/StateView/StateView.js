import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  addStateToServer,
  getAllState,
} from "../../../../../_redux/State/StateCrud";
import { StateSlice } from "../../../../../_redux/State/StateSlice";
import StateViewForm from "./StateViewForm";

const StateView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = StateSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedState, filter, page, dataPerPage, allCountry } = useSelector(
    (state) => ({
      selectedState: state.state.selectedState,
      filter: state.state.filter,
      page: state.state.page,
      dataPerPage: state.state.dataPerPage,
      allCountry: state.country.allCountry,
    }),
    shallowEqual
  );

  const saveState = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addStateToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("State", "updated"),
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
      {selectedState && show && (
        <StateViewForm
          show={show}
          onHide={onHide}
          saveState={saveState}
          selectedState={selectedState}
          allCountry={allCountry}
        />
      )}
    </>
  );
};

export default StateView;
