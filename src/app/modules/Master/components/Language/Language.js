import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllLanguage } from "../../../_redux/Language/LanguageCrud";
import { LanguageSlice } from "../../../_redux/Language/LanguageSlice";
import LanguageTable from "./components/LanguageTable/LanguageTable";

const Language = () => {
  const dispatch = useDispatch();
  const { actions } = LanguageSlice;

  const { allLanguage, filter, page, dataCount, dataPerPage } = useSelector(
    (state) => ({
      allLanguage: state.language.allLanguage,
      filter: state.language.filter,
      page: state.language.page,
      dataCount: state.language.dataCount,
      dataPerPage: state.language.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllLanguage({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllLanguage(res?.data?.data?.languages_data?.rows));
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
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <LanguageTable allLanguage={allLanguage} getAllData={getAllData} />
    </Paper>
  );
};

export default Language;
