import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import { closeModal } from "../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  industries_id: yup.number().required("Industry ID is required"),
  title: yup
    .string()
    .trim()
    .required("Industry Title is required"),
  is_active: yup.boolean(),
});

const init = {
  industries_id: 0,
  title: "",
  is_active: true,
};

const IndustryAddForm = ({ show, onHide, addIndustry }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          industries_id: values?.industries_id,
          title: values?.title,
          is_active: values?.is_active === true ? 1 : 0,
        };

        addIndustry({ ...obj })
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
                Industry
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Industry ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="industries_id"
                      value={values.industries_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.industries_id && errors.industries_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.industries_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Industry Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      isInvalid={touched.title && errors.title}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>

              <Form.Row>
                <Col sm={12}>
                  <FormControlLabel
                    value="is_active"
                    sx={{
                      fontWeight: 600,
                      color: "#3f4254 !important",
                      flexDirection: "row",
                    }}
                    control={
                      <Checkbox
                        checked={values.is_active}
                        disabled={isSubmitting}
                        color="primary"
                        onChange={handleChange}
                        name="is_active"
                      />
                    }
                    label="Is Active"
                  />
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

export default IndustryAddForm;
