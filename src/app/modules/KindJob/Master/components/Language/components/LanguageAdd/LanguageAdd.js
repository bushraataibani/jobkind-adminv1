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
import LanguageAddForm from "./LanguageAddForm";

const LanguageAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = LanguageSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.language.filter,
      page: state.language.page,
      dataPerPage: state.language.dataPerPage,
    }),
    shallowEqual
  );

  const addLanguage = (data) => {
    const dataToServer = cleanObject(data);

    return addLanguageToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Language", "added"),
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
    <LanguageAddForm show={show} onHide={onHide} addLanguage={addLanguage} />
  );
};

export default LanguageAdd;
