/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getAllEmployeeApplyJobs,
  getJobApplyEmployeeProfile,
  getEmployeeApplyJobProfile,
} from "../../../_redux/AppliedJob/AppliedJobCrud";
import { AppliedJobSlice } from "../../../_redux/AppliedJob/AppliedJobSlice";
import AppliedJobProfileView from "./AppliedJobProfileView";

const AppliedJobProfile = ({ show, id, onHide }) => {
  const dispatch = useDispatch();
  const { actions } = AppliedJobSlice;

  const {
    allEmployeeAppliedJob,
    selectedAppliedJob,
    employedApplyJobProfile,
    jobApplyEmployee,
    activeJobIndex,
  } = useSelector(
    (state) => ({
      allEmployeeAppliedJob: state.appliedJob.allEmployeeAppliedJob,
      selectedAppliedJob: state.appliedJob.selectedAppliedJob,
      employedApplyJobProfile: state.appliedJob.employedApplyJobProfile,
      jobApplyEmployee: state.appliedJob.jobApplyEmployee,
      activeJobIndex: state.appliedJob.activeJobIndex,
    }),
    shallowEqual
  );

  const getAllEmployeeAppliedJobs = (user_id) => {
    if (user_id) {
      dispatch(actions.setLoading(true));
      getAllEmployeeApplyJobs({
        search: "",
        page_no: 0,
        page_record: 10,
        user_id: user_id,
      })
        .then((res) => {
          dispatch(
            actions.setAllEmployeeAppliedJob(
              res?.data?.data?.employee_job_data?.rows
            )
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.employee_job_data?.count,
            })
          );
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  const getJobProfileEmployeeAppliedJobs = (user_id) => {
    if (user_id) {
      dispatch(actions.setLoading(true));
      getJobApplyEmployeeProfile(user_id)
        .then((res) => {
          dispatch(actions.setEmployeeAppliedJobProfile(res?.data?.data));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  const getJobApplyEmployeeProfileData = (applyId) => {
    if (applyId) {
      dispatch(actions.setLoading(true));
      getEmployeeApplyJobProfile(applyId)
        .then((res) => {
          dispatch(actions.setJobApplyEmployee(res?.data?.data?.job_data));
        })
        .catch((error) => console.error(error))
        .finally(() => {
          dispatch(actions.setLoading(false));
          dispatch(
            actions.setPageConfigData({
              type: "SET_IS_LOADING",
              data: false,
            })
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      getAllEmployeeAppliedJobs(
        selectedAppliedJob ? selectedAppliedJob.id.data : id
      );
      getJobProfileEmployeeAppliedJobs(
        selectedAppliedJob ? selectedAppliedJob.id.data : id
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (allEmployeeAppliedJob && allEmployeeAppliedJob?.length > 0) {
      getJobApplyEmployeeProfileData(
        allEmployeeAppliedJob?.[0]?.user_job_apply_id
      );
      dispatch(actions.setActiveJobIndex(0));
      dispatch(
        actions.setActiveJobData(allEmployeeAppliedJob?.[activeJobIndex])
      );
    }
  }, [allEmployeeAppliedJob]);

  return (
    show && (
      <AppliedJobProfileView
        show={show}
        onHide={onHide}
        allEmployeeAppliedJob={allEmployeeAppliedJob}
        employedApplyJobProfile={employedApplyJobProfile}
        jobApplyEmployee={jobApplyEmployee}
      />
    )
  );
};

export default AppliedJobProfile;
