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
import DegreeAddForm from "./DegreeAddForm";

const DegreeAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage, allEducation } = useSelector(
    (state) => ({
      filter: state.degree.filter,
      page: state.degree.page,
      dataPerPage: state.degree.dataPerPage,
      allEducation: state.education.allEducation,
    }),
    shallowEqual
  );

  const addDegree = (data) => {
    const dataToServer = cleanObject(data);

    return addDegreeToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Degree", "added"),
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
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.degrees_data?.count,
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
    <DegreeAddForm
      show={show}
      onHide={onHide}
      addDegree={addDegree}
      allEducation={allEducation}
    />
  );
};

export default DegreeAdd;
