import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DragDropFile from "../../../../../../Helpers/DragDropFile/DragDropFile";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployeeSlice } from "../../../../../_redux/Employee/EmployeeSlice";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import { addResumeToServer } from "../../../../../_redux/Employee/EmployeeCrud";

export function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} color="success" />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontWeight: 700, fontSize: "0.8rem" }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const Resume = ({ setIsResumeSubmitting, setFieldValue }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const { actions: generalActions } = generalSlice;

  const [isFileUploading, setIsFileUploading] = useState(false);

  let fileUploaded = [];

  const { fileProgress } = useSelector(
    (state) => ({
      fileProgress: state.employee.fileProgress,
    }),
    shallowEqual
  );

  return (
    <>
      <DragDropFile
        CSVProgress={<CircularProgressWithLabel value={fileProgress} />}
        Icon={PostAddIcon}
        label={"Upload your resume/CV"}
        disabled={isFileUploading}
        extra={{ fontWeight: "500", marginTop: "10px" }}
        styles={{
          rootStyles: {
            minHeight: "200px",
          },
        }}
        onChange={(event) => {
          let formData = new FormData();
          setIsResumeSubmitting(true);
          setIsFileUploading(true);

          fileUploaded = event.target.files[0];

          formData.append("file", fileUploaded);

          addResumeToServer(formData, dispatch, actions)
            .then((response) => {
              setFieldValue("resume_url", response?.data?.data?.link);

              dispatch(
                generalActions.pushNewAlert({
                  show: true,
                  heading: "Success",
                  errMessage: response?.data?.message,
                  message: successMessage("Resume", "upload"),
                  type: "success",
                })
              );
            })
            .finally(() => {
              dispatch(actions.setFileProgress(0));
              setIsFileUploading(false);
              setIsResumeSubmitting(false);
            });

          event.target.value = "";
        }}
        accept="application/pdf"
      />
    </>
  );
};

export default Resume;
