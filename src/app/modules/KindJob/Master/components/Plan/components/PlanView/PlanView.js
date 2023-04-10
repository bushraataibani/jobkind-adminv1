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
import PlanViewForm from "./PlanViewForm";

const PlanView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = PlanSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedPlan, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedPlan: state.plan.selectedPlan,
      filter: state.plan.filter,
      page: state.plan.page,
      dataPerPage: state.plan.dataPerPage,
    }),
    shallowEqual
  );

  const savePlan = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addPlanToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Plan", "updated"),
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
      {selectedPlan && show && (
        <PlanViewForm
          show={show}
          onHide={onHide}
          savePlan={savePlan}
          selectedPlan={selectedPlan}
        />
      )}
    </>
  );
};

export default PlanView;
