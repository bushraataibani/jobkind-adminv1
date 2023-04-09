import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  addSpecializationToServer,
  getAllSpecialization,
} from "../../../../../_redux/Specialization/SpecializationCrud";
import { SpecializationSlice } from "../../../../../_redux/Specialization/SpecializationSlice";
import SpecializationViewForm from "./SpecializationViewForm";

const SpecializationView = ({ show, id, onHide }) => {
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

  const saveSpecialization = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addSpecializationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Specialization", "updated"),
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
      {selectedSpecialization && show && (
        <SpecializationViewForm
          show={show}
          onHide={onHide}
          saveSpecialization={saveSpecialization}
          selectedSpecialization={selectedSpecialization}
        />
      )}
    </>
  );
};

export default SpecializationView;
