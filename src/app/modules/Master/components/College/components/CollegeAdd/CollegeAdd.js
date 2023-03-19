import React from "react";
import { useDispatch } from "react-redux";
import { successMessage } from "../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addCollegeToServer,
  getAllCollege,
} from "../../../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../../../_redux/College/CollegeSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import CollegeAddForm from "./CollegeAddForm";

const CollegeAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CollegeSlice;
  const { actions: generalActions } = generalSlice;

  const addCollege = (data) => {
    const dataToServer = cleanObject(data);

    return addCollegeToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("College", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllCollege()
        .then((res) => {
          dispatch(actions.setAllCollege(res?.data?.data?.collage_data?.rows));
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

  return <CollegeAddForm show={show} onHide={onHide} addCollege={addCollege} />;
};

export default CollegeAdd;
