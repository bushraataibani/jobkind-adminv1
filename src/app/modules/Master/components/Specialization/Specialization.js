import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllSpecialization } from "../../../_redux/Specialization/SpecializationCrud";
import { SpecializationSlice } from "../../../_redux/Specialization/SpecializationSlice";
import SpecializationTable from "./components/SpecializationTable/SpecializationTable";

const Specialization = () => {
  const dispatch = useDispatch();
  const { actions } = SpecializationSlice;

  const { allSpecialization, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allSpecialization: state.specialization.allSpecialization,
      filter: state.specialization.filter,
      page: state.specialization.page,
      dataPerPage: state.specialization.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllSpecialization({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllSpecialization(
            res?.data?.data?.specializations_data?.rows
          )
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.specializations_data?.count,
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
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SpecializationTable
        allSpecialization={allSpecialization}
        getAllData={getAllData}
      />
    </Paper>
  );
};

export default Specialization;
