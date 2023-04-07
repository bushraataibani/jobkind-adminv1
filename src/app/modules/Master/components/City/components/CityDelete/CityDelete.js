import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteCityFromServer,
  getAllCity,
} from "../../../../../_redux/City/CityCrud";
import { CitySlice } from "../../../../../_redux/City/CitySlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";

const CityDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CitySlice;
  const { actions: generalActions } = generalSlice;

  const { selectedCity, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedCity: state.city.selectedCity,
      filter: state.city.filter,
      page: state.city.page,
      dataPerPage: state.city.dataPerPage,
    }),
    shallowEqual
  );

  const deleteCity = () => {
    return deleteCityFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("City", "deleted"),
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

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteCity}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="City"
      selectedData={selectedCity && selectedCity?.title?.data}
    />
  );
};

export default CityDelete;
