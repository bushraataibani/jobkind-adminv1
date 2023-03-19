import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteLanguageFromServer,
  getAllLanguage,
} from "../../../../../_redux/Language/LanguageCrud";
import { LanguageSlice } from "../../../../../_redux/Language/LanguageSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";

const LanguageDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = LanguageSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedLanguage, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedLanguage: state.language.selectedLanguage,
      filter: state.language.filter,
      page: state.language.page,
      dataPerPage: state.language.dataPerPage,
    }),
    shallowEqual
  );

  const deleteLanguage = () => {
    return deleteLanguageFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Language", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllLanguage({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(
            actions.setAllLanguage(res?.data?.data?.languages_data?.rows)
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.languages_data?.count,
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
      deleteHandler={deleteLanguage}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Language"
      selectedData={selectedLanguage && selectedLanguage?.title?.data}
    />
  );
};

export default LanguageDelete;
