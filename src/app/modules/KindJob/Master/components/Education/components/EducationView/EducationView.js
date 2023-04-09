import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addEducationToServer,
  getAllEducation,
} from "../../../../../_redux/Education/EducationCrud";
import { EducationSlice } from "../../../../../_redux/Education/EducationSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import EducationViewForm from "./EducationViewForm";

const EducationView = ({ show, id, onHide }) => {
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

  const saveEducation = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addEducationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Education", "updated"),
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
      {selectedEducation && show && (
        <EducationViewForm
          show={show}
          onHide={onHide}
          saveEducation={saveEducation}
          selectedEducation={selectedEducation}
        />
      )}
    </>
  );
};

export default EducationView;
