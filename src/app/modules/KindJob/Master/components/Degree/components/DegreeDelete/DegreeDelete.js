import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import {
  deleteDegreeFromServer,
  getAllDegree,
} from "../../../_redux/Degree/DegreeCrud";
import { DegreeSlice } from "../../../_redux/Degree/DegreeSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const DegreeDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = DegreeSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedDegree, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedDegree: state.degree.selectedDegree,
      filter: state.degree.filter,
      page: state.degree.page,
      dataPerPage: state.degree.dataPerPage,
    }),
    shallowEqual
  );

  const deleteDegree = () => {
    return deleteDegreeFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Degree", "deleted"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllDegree({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllDegree(res?.data?.data?.degrees_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.degrees_data?.count,
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
      deleteHandler={deleteDegree}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Degree"
      selectedData={selectedDegree && selectedDegree?.title?.data}
    />
  );
};

export default DegreeDelete;
