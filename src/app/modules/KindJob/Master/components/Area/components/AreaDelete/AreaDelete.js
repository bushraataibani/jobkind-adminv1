import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteAreaFromServer,
  getAllArea,
} from "../../../../../_redux/Area/AreaCrud";
import { AreaSlice } from "../../../../../_redux/Area/AreaSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";

const AreaDelete = ({ show, id, onHide }) => {
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

  const deleteArea = () => {
    return deleteAreaFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Area", "deleted"),
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

  return (
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteArea}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Area"
      selectedData={selectedArea && selectedArea?.title?.data}
    />
  );
};

export default AreaDelete;
