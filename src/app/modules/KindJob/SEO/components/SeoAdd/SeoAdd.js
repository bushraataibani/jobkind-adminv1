import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SeoAddForm from "./SeoAddForm";
import { SeoSlice } from "../../../_redux/SEO/SeoSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { cleanObject } from "../../../../Utils/utils";
import { addSeoToServer, getAllSeo } from "../../../_redux/SEO/SeoCrud";
import { successMessage } from "../../../../Helpers/Alert/messages";

const SeoAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = SeoSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage, pageSlug } = useSelector(
    (state) => ({
      filter: state.seo.filter,
      page: state.seo.page,
      dataPerPage: state.seo.dataPerPage,
      pageSlug: state.seo.pageSlug,
    }),
    shallowEqual
  );

  const addSeo = (data) => {
    const dataToServer = cleanObject(data);

    return addSeoToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("SEO", "added"),
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
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.seo_data?.count,
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
    <SeoAddForm
      show={show}
      onHide={onHide}
      addSeo={addSeo}
      pageSlug={pageSlug}
    />
  );
};

export default SeoAdd;
