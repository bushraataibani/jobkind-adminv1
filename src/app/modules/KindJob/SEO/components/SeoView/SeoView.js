import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SeoViewForm from "./SeoViewForm";
import { SeoSlice } from "../../../_redux/SEO/SeoSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { cleanObject } from "../../../../Utils/utils";
import { addSeoToServer, getAllSeo } from "../../../_redux/SEO/SeoCrud";
import { successMessage } from "../../../../Helpers/Alert/messages";

const SeoView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SeoSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedSeo, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedSeo: state.seo.selectedSeo,
      filter: state.seo.filter,
      page: state.seo.page,
      dataPerPage: state.seo.dataPerPage,
    }),
    shallowEqual
  );

  const saveSeo = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addSeoToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("SEO", "updated"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllSeo({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllSeo(res?.data?.data?.seo_data?.rows));
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
      {selectedSeo && show && (
        <SeoViewForm
          show={show}
          onHide={onHide}
          saveSeo={saveSeo}
          selectedSeo={selectedSeo}
        />
      )}
    </>
  );
};

export default SeoView;
