/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getAllEmployerJob,
  getEmployerProfile,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import EmployerJobViewTable from "./EmployerJobViewTable";

const EmployerJob = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;

  const { empPage, empDataPerPage, selectedEmployer } = useSelector(
    (state) => ({
      empPage: state.employer.empPage,
      empDataPerPage: state.employer.empDataPerPage,
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const getEmployerProfileData = (id) => {
    dispatch(actions.setLoading(true));
    return getEmployerProfile(id)
      .then((res) => {
        dispatch(actions.setAllEmpProfile(res?.data?.data));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(actions.setLoading(false));
      });
  };

  const getAllJobList = (user_id) => {
    if (user_id) {
      dispatch(actions.setLoading(true));
      getAllEmployerJob({
        search: "",
        page_no: empPage,
        page_record: empDataPerPage,
        user_id: user_id,
      })
        .then((res) => {
          dispatch(
            actions.setAllEmployerJob(res?.data?.data?.employer_job_data?.rows)
          );
          dispatch(
            actions.setEmpPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.employer_job_data?.count,
            })
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setEmpPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      getAllJobList(selectedEmployer ? selectedEmployer.id.data : id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empPage, empDataPerPage, id]);

  useEffect(() => {
    if (id) {
      getEmployerProfileData(selectedEmployer ? selectedEmployer.id.data : id);
    }
  }, [id]);

  return <>{show && <EmployerJobViewTable show={show} onHide={onHide} />}</>;
};

export default EmployerJob;
