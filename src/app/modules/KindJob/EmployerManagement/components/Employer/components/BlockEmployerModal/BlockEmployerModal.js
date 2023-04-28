import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { EmployerSlice } from "../../../../../_redux/Employer/EmployerSlice";
import { generalSlice } from "../../../../../_redux/general/generalSlice";
import {
  getAllEmployer,
  postEmployerAction,
} from "../../../../../_redux/Employer/EmployerCrud";
import { successMessage } from "../../../../../../Helpers/Alert/messages";
import { closeModal } from "../../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../../Helpers/Dialog/DialogCloseTitle";
import CustomSwitch from "../../../../../../Helpers/CustomSwitch/CustomSwitch";
import BootstrapButton from "../../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  reason: yup
    .string()
    .trim()
    .required("Reason is required"),
  status: yup.boolean(),
});

const BlockEmployerModal = ({ show, onHide, id }) => {
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
    status: selectedEmployer?.status?.data === 4 ? true : false,
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

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      enableReinitialize={true}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: parseInt(id),
          status: values?.status === true ? 4 : 2,
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
            closeModal({ setIsEditing, onHide, resetForm })();
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
        <Dialog open={show} scroll={"paper"} maxWidth="sm" fullWidth={true}>
          <Form onSubmit={handleSubmit} noValidate>
            <DialogCloseTitle
              onClose={closeModal({ setIsEditing, onHide, resetForm })}
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
                      onLabel="Block"
                      offLabel="Unblock"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 20%)",
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
                      value={values.reason || isEditing}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
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
                onClick={closeModal({ setIsEditing, onHide, resetForm })}
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
