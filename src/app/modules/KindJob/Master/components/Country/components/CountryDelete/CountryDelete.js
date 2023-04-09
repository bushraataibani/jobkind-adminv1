import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteCountryFromServer,
  getAllCountry,
} from "../../../../../_redux/Country/CountryCrud";
import { CountrySlice } from "../../../../../_redux/Country/CountrySlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";

const CountryDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CountrySlice;
  const { actions: generalActions } = generalSlice;

  const { selectedCountry, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedCountry: state.country.selectedCountry,
      filter: state.country.filter,
      page: state.country.page,
      dataPerPage: state.country.dataPerPage,
    }),
    shallowEqual
  );

  const deleteCountry = () => {
    return deleteCountryFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Country", "deleted"),
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

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteCountry}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Country"
      selectedData={selectedCountry && selectedCountry?.country_name?.data}
    />
  );
};

export default CountryDelete;
