import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { closeModal } from "../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  collage_id: yup.number().required("College ID is required"),
  collage_name: yup
    .string()
    .trim()
    .required("College Name is required"),
  address: yup.string().trim(),
});

const init = {
  collage_id: 0,
  collage_name: "",
  address: "",
};

const CollegeAddForm = ({ show, onHide, addCollege }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        addCollege({ ...values })
          .then(() => {
            closeModal({ onHide, resetForm })();
          })
          .finally(() => {
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
                College
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      College ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="collage_id"
                      value={values.collage_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.collage_id && errors.collage_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.collage_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="collage_name"
                      value={values.collage_name}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.collage_name && errors.collage_name}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.collage_name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12} md={12}>
                  <Form.Group>
                    <Form.Label style={{ fontWeight: 600 }}>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      onBlur={handleBlur}
                      isInvalid={touched.address && errors.address}
                    />
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

export default CollegeAddForm;
