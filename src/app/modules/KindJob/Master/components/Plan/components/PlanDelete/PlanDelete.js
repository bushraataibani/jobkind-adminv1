import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  deletePlanFromServer,
  getAllPlan,
} from "../../../../../_redux/Plan/PlanCrud";
import { PlanSlice } from "../../../../../_redux/Plan/PlanSlice";

const PlanDelete = ({ show, id, onHide }) => {
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

  const deletePlan = () => {
    return deletePlanFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Plan", "deleted"),
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

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deletePlan}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Plan"
      selectedData={selectedPlan && selectedPlan?.title?.data}
    />
  );
};

export default PlanDelete;
