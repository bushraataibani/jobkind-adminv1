import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import * as yup from "yup";
import CustomSwitch from "../../../../../Helpers/CustomSwitch/CustomSwitch";
import { closeModal } from "../../../../../Helpers/Dialog/closeModal";
import DialogCloseTitle from "../../../../../Helpers/Dialog/DialogCloseTitle";
import BootstrapButton from "../../../../../Helpers/UI/Button/BootstrapButton";

const schema = yup.object({
  education_id: yup.number().required("Education ID is required"),
  title: yup
    .string()
    .trim()
    .required("Title is required"),
  is_active: yup.boolean(),
});

const EducationViewForm = ({
  show,
  onHide,
  saveEducation,
  selectedEducation,
}) => {
  const [isEditing, setIsEditing] = useState(true);

  const init = {
    education_id: parseInt(selectedEducation?.education_id?.data) || 0,
    title: selectedEducation?.title?.data || "",
    is_active: selectedEducation?.is_active?.dataIs,
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={init}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let obj = {
          education_id: parseInt(values?.education_id),
          title: values?.title,
          is_active: values?.is_active === true ? 1 : 0,
        };

        saveEducation({ ...obj })
          .then(() => {
            closeModal({ setIsEditing, onHide, resetForm })();
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
                Education
              </Box>
            </DialogCloseTitle>
            <DialogContent dividers>
              <Form.Row>
                <Col sm={12} md={6}>
                  <Form.Group md="1" className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Education ID
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="education_id"
                      value={parseInt(values.education_id)}
                      onChange={handleChange}
                      disabled={true}
                      onBlur={handleBlur}
                      isInvalid={touched.education_id && errors.education_id}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.education_id}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm={12} md={6}>
                  <Form.Group className="required">
                    <Form.Label style={{ fontWeight: 600 }}>
                      Education Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      disabled={isSubmitting || isEditing}
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

              {!isEditing ? (
                <BootstrapButton
                  variant="success"
                  type="submit"
                  label="Save"
                  labelWhenSubmitting="Saving"
                  isSubmitting={isSubmitting}
                  onClick={handleSubmit}
                  disabled={isSubmitting || isEditing}
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

export default EducationViewForm;
