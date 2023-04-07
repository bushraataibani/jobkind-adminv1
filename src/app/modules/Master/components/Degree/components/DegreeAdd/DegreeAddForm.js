import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  degree_id: yup.number().required("Degree ID is required"),
  title: yup
    .string()
    .trim()
    .required("Title is required"),
  is_active: yup.boolean(),
});

const init = {
  degree_id: 0,
  title: "",
  is_active: true,
};

const DegreeAddForm = ({ show, onHide, addDegree }) => {
  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          degree_id: values?.degree_id,
          title: values?.title,
          is_active: values?.is_active === true ? 1 : 0,
        };

        addDegree({ ...obj })
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
                Degree
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Degree ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="degree_id"
                      value={values.degree_id}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.degree_id && errors.degree_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.degree_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Degree Name
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
                  <Form.Group>
                    <CustomSwitch
                      checked={values.is_active}
                      onChange={(e) =>
                        setFieldValue("is_active", e.target.checked)
                      }
                      onLabel="Active"
                      offLabel="Inactive"
                      switchOffStyles={{
                        backgroundColor: "rgb(216, 17, 17, 20%)",
                      }}
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

export default DegreeAddForm;
