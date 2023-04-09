import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteIndustryFromServer,
  getAllIndustry,
} from "../../../_redux/Industry/IndustryCrud";
import { IndustrySlice } from "../../../_redux/Industry/IndustrySlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const IndustryDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = IndustrySlice;
  const { actions: generalActions } = generalSlice;

  const { selectedIndustry, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedIndustry: state.industry.selectedIndustry,
      filter: state.industry.filter,
      page: state.industry.page,
      dataPerPage: state.industry.dataPerPage,
    }),
    shallowEqual
  );

  const deleteIndustry = () => {
    return deleteIndustryFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Master", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllIndustry({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(
            actions.setAllIndustry(res?.data?.data?.industries_data?.rows)
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.industries_data?.count,
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
      deleteHandler={deleteIndustry}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Industry"
      selectedData={selectedIndustry && selectedIndustry?.title?.data}
    />
  );
};

export default IndustryDelete;
