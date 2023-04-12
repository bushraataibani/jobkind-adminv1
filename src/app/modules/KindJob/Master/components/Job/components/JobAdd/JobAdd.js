import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import { addJobToServer, getAllJob } from "../../../../../_redux/Job/JobCrud";
import { JobSlice } from "../../../../../_redux/Job/JobSlice";
import JobAddForm from "./JobAddForm";

const JobAdd = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = JobSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage, allDepartment } = useSelector(
    (state) => ({
      filter: state.job.filter,
      page: state.job.page,
      dataPerPage: state.job.dataPerPage,
      allDepartment: state.department.allDepartment,
    }),
    shallowEqual
  );

  const addJob = (data) => {
    const dataToServer = cleanObject(data);

    return addJobToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Job", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllJob({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(actions.setAllJob(res?.data?.data?.job_data?.rows));
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.job_data?.count,
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
    <JobAddForm
      show={show}
      onHide={onHide}
      addJob={addJob}
      allDepartment={allDepartment}
    />
  );
};

export default JobAdd;
