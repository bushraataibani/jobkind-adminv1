import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import DialogCloseTitle from "../../../../Helpers/Dialog/DialogCloseTitle";
import CustomSwitch from "../../../../Helpers/CustomSwitch/CustomSwitch";
import BootstrapButton from "../../../../Helpers/UI/Button/BootstrapButton";
import { postUserAction } from "../../../_redux/Employee/EmployeeCrud";
import { useDispatch } from "react-redux";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";
import { closeModal } from "../../../../Helpers/Dialog/closeModal";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { generalSlice } from "../../../_redux/general/generalSlice";

const schema = yup.object({
  reason: yup
    .string()
    .trim()
    .required("Reason is required"),
  status: yup.boolean(),
});

const init = {
  reason: "",
  status: true,
};

const BlockEmployeeModal = ({ show, onHide, id }) => {
  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const { actions: generalActions } = generalSlice;

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          user_id: parseInt(id),
          status: values?.status === true ? 4 : 2,
          reason: values?.reason,
        };

        dispatch(actions.setLoading(true));
        postUserAction(obj)
          .then((res) => {
            dispatch(
              generalActions.pushNewAlert({
                show: true,
                heading: "Success",
                message:
                  values?.status === true
                    ? successMessage("Employee", "Blocked")
                    : successMessage("Employee", "Unblocked"),
                type: "success",
              })
            );
          })
          .catch((error) => {
            console.error(error);
            dispatch(actions.setLoading(false));
          })
          .finally(() => {
            closeModal({ onHide, resetForm })();
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
              onClose={closeModal({ onHide, resetForm })}
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
                      disabled={isSubmitting}
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
                      value={values.reason}
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
                onClick={closeModal({ onHide, resetForm })}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <BootstrapButton
                variant="success"
                type="submit"
                label="Save"
                labelWhenSubmitting="Saving"
                isSubmitting={isSubmitting}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  );
};

export default BlockEmployeeModal;
