import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addSpecializationToServer,
  getAllSpecialization,
} from "../../../../../_redux/Specialization/SpecializationCrud";
import { SpecializationSlice } from "../../../../../_redux/Specialization/SpecializationSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import SpecializationAddForm from "./SpecializationAddForm";

const SpecializationAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SpecializationSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.specialization.filter,
      page: state.specialization.page,
      dataPerPage: state.specialization.dataPerPage,
    }),
    shallowEqual
  );

  const addSpecialization = (data) => {
    const dataToServer = cleanObject(data);

    return addSpecializationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Specialization", "added"),
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
    <SpecializationAddForm
      show={show}
      onHide={onHide}
      addSpecialization={addSpecialization}
    />
  );
};

export default SpecializationAdd;
