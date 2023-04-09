import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addDegreeToServer,
  getAllDegree,
} from "../../../../../_redux/Degree/DegreeCrud";
import { DegreeSlice } from "../../../../../_redux/Degree/DegreeSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import DegreeViewForm from "./DegreeViewForm";

const DegreeView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedDegree, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedDegree: state.degree.selectedDegree,
      filter: state.degree.filter,
      page: state.degree.page,
      dataPerPage: state.degree.dataPerPage,
    }),
    shallowEqual
  );

  const saveDegree = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addDegreeToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Degree", "updated"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllDegree({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllDegree(res?.data?.data?.degrees_data?.rows));
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
      {selectedDegree && show && (
        <DegreeViewForm
          show={show}
          onHide={onHide}
          saveDegree={saveDegree}
          selectedDegree={selectedDegree}
        />
      )}
    </>
  );
};

export default DegreeView;
