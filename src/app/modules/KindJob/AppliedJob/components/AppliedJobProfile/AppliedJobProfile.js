/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Dialog, DialogContent } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import {
  getAllEmployeeApplyJobs,
  getAllJobAppyEmployee,
  getEmployeeApplyJobProfile,
  getJobApplyEmployeeProfile,
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
    filter,
    page,
    dataPerPage,
  } = useSelector(
    (state) => ({
      allEmployeeAppliedJob: state.appliedJob.allEmployeeAppliedJob,
      selectedAppliedJob: state.appliedJob.selectedAppliedJob,
      employedApplyJobProfile: state.appliedJob.employedApplyJobProfile,
      jobApplyEmployee: state.appliedJob.jobApplyEmployee,
      activeJobIndex: state.appliedJob.activeJobIndex,
      filter: state.appliedJob.filter,
      page: state.appliedJob.page,
      dataPerPage: state.appliedJob.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllJobAppyEmployee({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(
          actions.setAllAppliedJob(res?.data?.data?.employee_data?.rows)
        );
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employee_data?.count,
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
    <Dialog open={show} scroll="paper" fullScreen>
      <DialogCloseTitle onClose={() => onHide()}>
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          Applied Job Profile
        </Box>
      </DialogCloseTitle>
      <DialogContent dividers={false}>
        <AppliedJobProfileView
          allEmployeeAppliedJob={allEmployeeAppliedJob}
          employedApplyJobProfile={employedApplyJobProfile}
          jobApplyEmployee={jobApplyEmployee}
          id={id}
          getAllData={getAllData}
          getAllEmployeeAppliedJobs={getAllEmployeeAppliedJobs}
          getJobProfileEmployeeAppliedJobs={getJobProfileEmployeeAppliedJobs}
          getJobApplyEmployeeProfileData={getJobApplyEmployeeProfileData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppliedJobProfile;
