import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import DeleteModal from "../../../../../../Helpers/DeleteModal/DeleteModal";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  deleteJobFromServer,
  getAllJob,
} from "../../../../../_redux/Job/JobCrud";
import { JobSlice } from "../../../../../_redux/Job/JobSlice";

const JobDelete = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = JobSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedJob, filter, page, dataPerPage } = useSelector(
    (state) => ({
      selectedJob: state.job.selectedJob,
      filter: state.job.filter,
      page: state.job.page,
      dataPerPage: state.job.dataPerPage,
    }),
    shallowEqual
  );

  const deleteJob = () => {
    return deleteJobFromServer(id).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Job", "deleted"),
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
    <DeleteModal
      show={show}
      cancelHandler={onHide}
      deleteHandler={deleteJob}
      deleteButtonLabelWhenSubmitting="Deleting"
      title="Job"
      selectedData={selectedJob && selectedJob?.title?.data}
    />
  );
};

export default JobDelete;
