import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { cleanObject } from "../../../../../../Utils/utils";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import { addJobToServer, getAllJob } from "../../../../../_redux/Job/JobCrud";
import { JobSlice } from "../../../../../_redux/Job/JobSlice";
import JobViewForm from "./JobViewForm";

const JobView = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = JobSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedJob, filter, page, dataPerPage, allDepartment } = useSelector(
    (state) => ({
      selectedJob: state.job.selectedJob,
      filter: state.job.filter,
      page: state.job.page,
      dataPerPage: state.job.dataPerPage,
      allDepartment: state.department.allDepartment,
    }),
    shallowEqual
  );

  const saveJob = (data) => {
    dispatch(actions.setPageConfigData({ type: "SET_IS_LOADING", data: true }));
    const dataToServer = cleanObject(data);

    return addJobToServer(dataToServer).then(() => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Job", "updated"),
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
          dispatch(actions.setAllJob(res?.data?.data?.jobs_data?.rows));
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
      {selectedJob && show && (
        <JobViewForm
          show={show}
          onHide={onHide}
          saveJob={saveJob}
          selectedJob={selectedJob}
          allDepartment={allDepartment}
        />
      )}
    </>
  );
};

export default JobView;
