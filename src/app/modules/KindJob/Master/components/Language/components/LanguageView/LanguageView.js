import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  addLanguageToServer,
  getAllLanguage,
} from "../../../../../_redux/Language/LanguageCrud";
import { LanguageSlice } from "../../../../../_redux/Language/LanguageSlice";
import LanguageViewForm from "./LanguageViewForm";

const LanguageView = ({ show, id, onHide }) => {
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

  const saveLanguage = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addLanguageToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Language", "updated"),
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
      {selectedLanguage && show && (
        <LanguageViewForm
          show={show}
          onHide={onHide}
          saveLanguage={saveLanguage}
          selectedLanguage={selectedLanguage}
        />
      )}
    </>
  );
};

export default LanguageView;
