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
import AreaViewForm from "./AreaViewForm";

const AreaView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = AreaSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedArea, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedArea: state.area.selectedArea,
      filter: state.area.filter,
      page: state.area.page,
      dataPerPage: state.area.dataPerPage,
    }),
    shallowEqual
  );

  const saveArea = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addAreaToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Area", "updated"),
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
      {selectedArea && show && (
        <AreaViewForm
          show={show}
          onHide={onHide}
          saveArea={saveArea}
          selectedArea={selectedArea}
        />
      )}
    </>
  );
};

export default AreaView;
