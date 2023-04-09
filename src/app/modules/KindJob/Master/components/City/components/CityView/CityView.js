import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addCityToServer,
  getAllCity,
} from "../../../../../_redux/City/CityCrud";
import { CitySlice } from "../../../../../_redux/City/CitySlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import CityViewForm from "./CityViewForm";

const CityView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;
  const { actions: generalActions } = generalSlice;

  const {
    selectedCity,
    filter,
    page,
    dataPerPage,
    allState,
    allCountry,
  } = useSelector(
    (state) => ({
      selectedCity: state.city.selectedCity,
      filter: state.city.filter,
      page: state.city.page,
      dataPerPage: state.city.dataPerPage,
      allState: state.state.allState,
      allCountry: state.country.allCountry,
    }),
    shallowEqual
  );

  const saveCity = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addCityToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("City", "updated"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllCity({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllCity(res?.data?.data?.city_data?.rows));
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
      {selectedCity && show && (
        <CityViewForm
          show={show}
          onHide={onHide}
          saveCity={saveCity}
          selectedCity={selectedCity}
          allState={allState}
          allCountry={allCountry}
        />
      )}
    </>
  );
};

export default CityView;
