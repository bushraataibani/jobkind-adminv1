import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addEducationToServer,
  getAllEducation,
} from "../../../_redux/Education/EducationCrud";
import { EducationSlice } from "../../../_redux/Education/EducationSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import EducationAddForm from "./EducationAddForm";

const EducationAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EducationSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.education.filter,
      page: state.education.page,
      dataPerPage: state.education.dataPerPage,
    }),
    shallowEqual
  );

  const addEducation = (data) => {
    const dataToServer = cleanObject(data);

    return addEducationToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Education", "added"),
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
    <EducationAddForm show={show} onHide={onHide} addEducation={addEducation} />
  );
};

export default EducationAdd;
