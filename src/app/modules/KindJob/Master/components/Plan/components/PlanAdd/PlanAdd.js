import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  addPlanToServer,
  getAllPlan,
} from "../../../../../_redux/Plan/PlanCrud";
import { PlanSlice } from "../../../../../_redux/Plan/PlanSlice";
import PlanAddForm from "./PlanAddForm";

const PlanAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PlanSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.plan.filter,
      page: state.plan.page,
      dataPerPage: state.plan.dataPerPage,
    }),
    shallowEqual
  );

  const addPlan = (data) => {
    const dataToServer = cleanObject(data);

    return addPlanToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Plan", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllPlan({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllPlan(res?.data?.data?.plans_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.plans_data?.count,
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

  return <PlanAddForm show={show} onHide={onHide} addPlan={addPlan} />;
};

export default PlanAdd;
