import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import {
  addAreaToServer,
  getAllArea,
} from "../../../../../_redux/Area/AreaCrud";
import { AreaSlice } from "../../../../../_redux/Area/AreaSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import AreaAddForm from "./AreaAddForm";

const AreaAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = AreaSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.area.filter,
      page: state.area.page,
      dataPerPage: state.area.dataPerPage,
    }),
    shallowEqual
  );

  const addArea = (data) => {
    const dataToServer = cleanObject(data);

    return addAreaToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Area", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllArea({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllArea(res?.data?.data?.area_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.area_data?.count,
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

  return <AreaAddForm show={show} onHide={onHide} addArea={addArea} />;
};

export default AreaAdd;
