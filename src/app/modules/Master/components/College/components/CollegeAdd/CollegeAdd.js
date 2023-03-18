import React from "react";
import { useDispatch } from "react-redux";
import { cleanObject } from "../../../../../Utils/utils";
import {
  addCollegeToServer,
  getAllCollege,
} from "../../../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../../../_redux/College/CollegeSlice";
import CollegeAddForm from "./CollegeAddForm";

const CollegeAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = CollegeSlice;

  console.log(show, onHide, "show, onHide");

  const addCollege = (data) => {
    const dataToServer = cleanObject(data);

    return addCollegeToServer(dataToServer).then(() => {
      // dispatch(
      //   generalActions.pushNewAlert({
      //     show: true,
      //     heading: "Success",
      //     message: successMessage("Master", "added"),
      //     type: "success",
      //   })
      // );

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
