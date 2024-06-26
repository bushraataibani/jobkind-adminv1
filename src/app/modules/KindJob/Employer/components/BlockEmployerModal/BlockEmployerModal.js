import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { successMessage } from "../../../../Helpers/Alert/messages";
import CustomSwitch from "../../../../Helpers/CustomSwitch/CustomSwitch";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import {
  getAllEmployer,
  postEmployerAction,
} from "../../../_redux/Employer/EmployerCrud";
import { EmployerSlice } from "../../../_redux/Employer/EmployerSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";

const schema = yup.object({
  // reason: yup.string().when("status", {
  //   is: true,
  //   then: yup
  //     .string()
  //     .trim()
  //     .required("Reason is required"),
  //   otherwise: yup.string().trim(),
  // }),
  reason: yup
    .string()
    .trim()
    .required("Reason is required"),

  status: yup.boolean(),
});

const BlockEmployerModal = ({ showBlockModal, setShowBlockModal }) => {
  const dispatch = useDispatch();
  const { actions } = EmployerSlice;
  const { actions: generalActions } = generalSlice;

  const { selectedEmployer } = useSelector(
    (state) => ({
      selectedEmployer: state.employer.selectedEmployer,
    }),
    shallowEqual
  );

  const [isEditing, setIsEditing] = useState(true);

  const init = {
    reason: selectedEmployer?.reason?.data || "",
    status: selectedEmployer?.status?.dataIs === 4 ? false : true,
  };

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.employer.filter,
      page: state.employer.page,
      dataPerPage: state.employer.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllEmployer({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllEmployer(res?.data?.data?.employer_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.employer_data?.count,
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

  const handleClose = (resetForm) => {
    setIsEditing(false);
    setShowBlockModal(false);
    resetForm();
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      enableReinitialize={true}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: parseInt(selectedEmployer?.user_id?.data),
          status: values?.status === true ? 2 : 4,
          reason: values?.reason,
        };

        dispatch(actions.setLoading(true));
        postEmployerAction(obj)
          .then((res) => {
            dispatch(
              generalActions.pushNewAlert({
                show: true,
                heading: "Success",
                message:
                  values?.status === true
                    ? successMessage("Employer", "Blocked")
                    : successMessage("Employer", "Unblocked"),
                type: "success",
              })
            );

            getAllData();
          })
          .catch((error) => {
            console.error(error);
            dispatch(actions.setLoading(false));
          })
          .finally(() => {
            handleClose(resetForm);
            dispatch(actions.setLoading(false));
            setSubmitting(false);
          });
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        isValid,
        errors,
        touched,
        resetForm,
      }) => (
        <Dialog
          open={showBlockModal}
          scroll={"paper"}
          maxWidth="sm"
          fullWidth={true}
        >
          <Form onSubmit={handleSubmit} noValidate>
            <DialogCloseTitle
              onClose={() => handleClose(resetForm)}
              isCloseButtonDisabled={isSubmitting}
            >
              <Box
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: (theme) => theme.palette.primary.main,
                }}
              >
                Block
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12}>
                  <Form.Group>
                    <CustomSwitch
                      checked={values.status}
                      disabled={isSubmitting || isEditing}
                      onChange={(e) =>
                        setFieldValue("status", e.target.checked)
                      }
                      onLabel="Unblock"
                      offLabel="Block"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 90%)",
                      }}
                    />
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="reason"
                      value={values.reason}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
                      isInvalid={touched.reason && errors.reason}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.reason}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={() => handleClose(resetForm)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              {!isEditing ? (
                <BootstrapButton
                  variant="success"
                  type="submit"
                  label="Save"
                  labelWhenSubmitting="Saving"
                  isSubmitting={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                />
              ) : (
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => setIsEditing(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </Button>
              )}
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default BlockEmployerModal;
