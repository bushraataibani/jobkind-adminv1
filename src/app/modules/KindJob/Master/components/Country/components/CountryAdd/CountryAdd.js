import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addCountryToServer,
  getAllCountry,
} from "../../../../../_redux/Country/CountryCrud";
import { CountrySlice } from "../../../../../_redux/Country/CountrySlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import CountryAddForm from "./CountryAddForm";

const CountryAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CountrySlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.country.filter,
      page: state.country.page,
      dataPerPage: state.country.dataPerPage,
    }),
    shallowEqual
  );

  const addCountry = (data) => {
    const dataToServer = cleanObject(data);

    return addCountryToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Country", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllCountry({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllCountry(res?.data?.data?.country_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.country_data?.count,
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

  return <CountryAddForm show={show} onHide={onHide} addCountry={addCountry} />;
};

export default CountryAdd;
