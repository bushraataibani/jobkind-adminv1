import React, { useContext, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllCollege } from "../../../_redux/College/CollegeCrud";
import { CollegeSlice } from "../../../_redux/College/CollegeSlice";
import { CollegeContext } from "./CollegeRoute";

const College = () => {
  const dispatch = useDispatch();
  const context = useContext(CollegeContext);

  const { actions } = CollegeSlice;

  const {
    allCollege,
    isLoading,
    filter,
    page,
    dataCount,
    dataPerPage,
  } = useSelector(
    (state) => ({
      allCollege: state.college.allCollege,
      isLoading: state.college.isLoading,
      filter: state.college.filter,
      page: state.college.page,
      dataCount: state.college.dataCount,
      dataPerPage: state.college.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    getAllCollege()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log());
  };

  useEffect(() => {
    getAllData();
  }, []);

  return <div>College</div>;
};

export default College;
