import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addCityToServer,
  getAllCity,
} from "../../../../../_redux/City/CityCrud";
import { CitySlice } from "../../../../../_redux/City/CitySlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import CityAddForm from "./CityAddForm";

const CityAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.city.filter,
      page: state.city.page,
      dataPerPage: state.city.dataPerPage,
    }),
    shallowEqual
  );

  const addCity = (data) => {
    const dataToServer = cleanObject(data);

    return addCityToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("City", "added"),
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
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.city_data?.count,
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

  return <CityAddForm show={show} onHide={onHide} addCity={addCity} />;
};

export default CityAdd;
