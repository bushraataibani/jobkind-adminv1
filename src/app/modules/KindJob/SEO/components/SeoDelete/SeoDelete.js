import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SeoSlice } from "../../../_redux/SEO/SeoSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import { deleteSeoFromServer, getAllSeo } from "../../../_redux/SEO/SeoCrud";
import { successMessage } from "../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../Helpers/DeleteModal/DeleteModal";

const SeoDelete = ({ show, id, onHide }) => {
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

  const deleteSeo = () => {
    return deleteSeoFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("SEO", "deleted"),
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
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteSeo}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="SEO"
      selectedData={selectedSeo && selectedSeo?.keyword?.data}
    />
  );
};

export default SeoDelete;
