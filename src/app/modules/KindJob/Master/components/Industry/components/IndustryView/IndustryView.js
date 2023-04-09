import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addIndustryToServer,
  getAllIndustry,
} from "../../../_redux/Industry/IndustryCrud";
import { IndustrySlice } from "../../../_redux/Industry/IndustrySlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import IndustryViewForm from "./IndustryViewForm";

const IndustryView = ({ show, id, onHide }) => {
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

  const saveIndustry = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addIndustryToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Industry", "updated"),
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
      {selectedIndustry && show && (
        <IndustryViewForm
          show={show}
          onHide={onHide}
          saveIndustry={saveIndustry}
          selectedIndustry={selectedIndustry}
        />
      )}
    </>
  );
};

export default IndustryView;
